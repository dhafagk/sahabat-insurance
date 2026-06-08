/**
 * Migrate all media files from Vercel Blob to local disk (public/media/),
 * then update the `url` column in Postgres to point to the local path.
 *
 * Run AFTER your target Postgres is up (Payload migrations must have run at
 * least once so the `media` table exists):
 *   node scripts/migrate-blob-to-local.mjs
 *
 * For a FRESH database: start the app once so Payload creates the schema,
 * then stop it and re-run this script to fix any URLs if you imported data.
 * If the database is truly empty, the UPDATE will report 0 rows — that is fine.
 *
 * Environment variables used:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  — read file list from old DB
 *   DATABASE_URL                             — write updated URLs to new DB
 *   DATABASE_SSL                             — set to "true" for Supabase/SSL hosts
 *
 * Safe to re-run — already-downloaded files are skipped.
 */

import { createWriteStream, mkdirSync, existsSync, readFileSync } from "fs";
import { pipeline } from "stream/promises";
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
    console.warn(
      "Warning: could not read .env file — falling back to process.env",
    );
  }
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env",
  );
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
  fileURLToPath(new URL("../public/media", import.meta.url)),
);
mkdirSync(mediaDir, { recursive: true });
console.log(`Output directory: ${mediaDir}\n`);

// ---------------------------------------------------------------------------
// Fetch media records from Supabase
// ---------------------------------------------------------------------------
const res = await fetch(
  `${SUPABASE_URL}/rest/v1/media?select=id,filename,url`,
  {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  },
);

if (!res.ok) {
  console.error("Failed to fetch media records:", await res.text());
  process.exit(1);
}

const records = await res.json();

if (!Array.isArray(records)) {
  console.error("Unexpected response from Supabase:", records);
  process.exit(1);
}

console.log(`Found ${records.length} media record(s)\n`);

// ---------------------------------------------------------------------------
// Download each file
// ---------------------------------------------------------------------------
let downloaded = 0;
let skipped = 0;
let failed = 0;
const failures = [];

for (const record of records) {
  const { id, filename, url } = record;

  if (!filename || !url) {
    console.log(`  [${id}] Skip — missing filename or url`);
    skipped++;
    continue;
  }

  // Only touch Vercel Blob URLs
  if (
    !url.includes("blob.vercel-storage.com") &&
    !url.includes("public.blob")
  ) {
    console.log(`  [${id}] Skip — not a blob URL: ${url}`);
    skipped++;
    continue;
  }

  const destPath = path.join(mediaDir, filename);

  if (existsSync(destPath)) {
    console.log(`  [${id}] Already exists: ${filename}`);
    skipped++;
    continue;
  }

  process.stdout.write(`  [${id}] Downloading ${filename} ... `);

  try {
    const fileRes = await fetch(url);
    if (!fileRes.ok)
      throw new Error(`HTTP ${fileRes.status} ${fileRes.statusText}`);

    await pipeline(fileRes.body, createWriteStream(destPath));

    console.log("ok");
    downloaded++;
  } catch (err) {
    console.log(`FAILED  (${err.message})`);
    failures.push({ id, filename, url, error: err.message });
    failed++;
  }
}

// ---------------------------------------------------------------------------
// File download summary
// ---------------------------------------------------------------------------
console.log(`\n${"─".repeat(50)}`);
console.log(`Downloaded : ${downloaded}`);
console.log(`Skipped    : ${skipped}`);
console.log(`Failed     : ${failed}`);

if (failures.length > 0) {
  console.log("\nFailed files:");
  for (const f of failures) {
    console.log(`  - [${f.id}] ${f.filename}: ${f.error}`);
  }
  console.log("\nRe-run the script to retry failed downloads.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Update media URLs in the target Postgres database
//
// DATABASE_URL should point to your NEW (local Docker) Postgres, not Supabase.
// For a fresh database the table may not exist yet — that is handled below.
// ---------------------------------------------------------------------------
console.log(`\nConnecting to target database to update media URLs...`);
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
    WHERE url LIKE '%blob.vercel-storage.com%'
       OR url LIKE '%public.blob%'
  `;

  if (result.count === 0) {
    console.log(
      "Database update: 0 rows updated.\n" +
        "  This is expected for a fresh database — no Blob URLs to replace.\n" +
        "  If you imported data and expected updates, check that DATABASE_URL\n" +
        "  points to the correct database.",
    );
  } else {
    console.log(`Database update: ${result.count} media URL(s) updated to /media/<filename>.`);
  }
} catch (err) {
  if (err.code === "42P01") {
    // Relation (table) does not exist
    console.log(
      "Note: media table not found in the target database.\n" +
        "  Start the app once so Payload runs its migrations, then re-run\n" +
        "  this script to update the URLs.",
    );
  } else {
    console.error("Database update failed:", err.message);
    process.exit(1);
  }
} finally {
  if (sql) await sql.end({ timeout: 5 }).catch(() => {});
}

console.log(
  "\nDone. Next steps:\n" +
    "  1. Remove vercelBlobStorage from payload.config.ts\n" +
    "  2. docker compose up --build",
);
