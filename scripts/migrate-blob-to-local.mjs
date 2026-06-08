/**
 * Migrate all media files from Vercel Blob to local disk (public/media/),
 * then update the `url` column in Postgres to point to the local path.
 *
 *   node scripts/migrate-blob-to-local.mjs
 *
 * Environment variables used:
 *   BLOB_READ_WRITE_TOKEN  — list and download files from Vercel Blob
 *   DATABASE_URL           — update URLs in the new DB
 *   DATABASE_SSL           — set to "true" for SSL hosts
 *
 * Safe to re-run — already-downloaded files are skipped.
 */

import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------
function loadEnv() {
  try {
    const envPath = new URL("../.env", import.meta.url);
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    console.warn("Warning: could not read .env file — falling back to process.env");
  }
}

loadEnv();

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;

if (!BLOB_TOKEN) {
  console.error("Error: BLOB_READ_WRITE_TOKEN must be set in .env");
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL must be set in .env");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Prepare output directory
// ---------------------------------------------------------------------------
const mediaDir = path.resolve(
  fileURLToPath(new URL("../public/media", import.meta.url))
);
mkdirSync(mediaDir, { recursive: true });
console.log(`Output directory: ${mediaDir}\n`);

// ---------------------------------------------------------------------------
// List all blobs from Vercel Blob API (handles pagination)
// ---------------------------------------------------------------------------
async function listAllBlobs() {
  const blobs = [];
  let cursor = null;

  do {
    const url = new URL("https://blob.vercel-storage.com");
    url.searchParams.set("limit", "1000");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${BLOB_TOKEN}` },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Vercel Blob API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    blobs.push(...(data.blobs ?? []));
    cursor = data.hasMore ? data.cursor : null;
  } while (cursor);

  return blobs;
}

console.log("Fetching blob list from Vercel...");
const blobs = await listAllBlobs();
console.log(`Found ${blobs.length} blob(s)\n`);

// ---------------------------------------------------------------------------
// Download each blob
// ---------------------------------------------------------------------------
let downloaded = 0;
let skipped = 0;
let failed = 0;
const failures = [];

for (const blob of blobs) {
  // blob.pathname is the filename as stored in Vercel Blob
  const filename = path.basename(blob.pathname);
  const destPath = path.join(mediaDir, filename);

  if (existsSync(destPath)) {
    console.log(`  Skip (exists): ${filename}`);
    skipped++;
    continue;
  }

  process.stdout.write(`  Downloading ${filename} ... `);

  try {
    const fileRes = await fetch(blob.url);
    if (!fileRes.ok)
      throw new Error(`HTTP ${fileRes.status} ${fileRes.statusText}`);

    const buffer = Buffer.from(await fileRes.arrayBuffer());
    writeFileSync(destPath, buffer);

    console.log("ok");
    downloaded++;
  } catch (err) {
    console.log(`FAILED  (${err.message})`);
    failures.push({ filename, url: blob.url, error: err.message });
    failed++;
  }
}

console.log(`\n${"─".repeat(50)}`);
console.log(`Downloaded : ${downloaded}`);
console.log(`Skipped    : ${skipped}`);
console.log(`Failed     : ${failed}`);

if (failures.length > 0) {
  console.log("\nFailed files:");
  for (const f of failures) {
    console.log(`  - ${f.filename}: ${f.error}`);
  }
  console.log("\nRe-run the script to retry failed downloads.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Update media URLs in the target Postgres database
// Payload stores URLs as /api/media/file/<filename> when using Vercel Blob.
// We update them to /media/<filename> for local storage.
// ---------------------------------------------------------------------------
console.log(`\nUpdating media URLs in database...`);
console.log(`  DATABASE_URL: ${DATABASE_URL.replace(/:([^:@]+)@/, ":***@")}\n`);

let sql;
try {
  const { default: postgres } = await import("postgres");

  sql = postgres(DATABASE_URL, {
    ssl: process.env.DATABASE_SSL === "true" ? "require" : false,
    max: 1,
    idle_timeout: 10,
  });

  const result = await sql`
    UPDATE media
    SET url = '/media/' || filename
    WHERE url LIKE '/api/media/file/%'
       OR url LIKE '%blob.vercel-storage.com%'
       OR url LIKE '%public.blob%'
  `;

  if (result.count === 0) {
    console.log(
      "Database update: 0 rows updated.\n" +
        "  Either URLs are already local, or the media table is empty."
    );
  } else {
    console.log(`Database update: ${result.count} media URL(s) updated to /media/<filename>.`);
  }
} catch (err) {
  if (err.code === "42P01") {
    console.log(
      "Note: media table not found — start the app once so Payload creates\n" +
        "the schema, then re-run this script to update the URLs."
    );
  } else {
    console.error("Database update failed:", err.message);
    process.exit(1);
  }
} finally {
  if (sql) await sql.end({ timeout: 5 }).catch(() => {});
}

console.log("\nDone.");
