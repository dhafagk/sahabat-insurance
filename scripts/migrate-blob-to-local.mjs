/**
 * Migrate all media files from Vercel Blob to local disk (public/media/).
 *
 * Run on the server BEFORE switching the Payload config to local storage:
 *   node scripts/migrate-blob-to-local.mjs
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

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env",
  );
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

    console.log("✓");
    downloaded++;
  } catch (err) {
    console.log(`✗  (${err.message})`);
    failures.push({ id, filename, url, error: err.message });
    failed++;
  }
}

// ---------------------------------------------------------------------------
// Summary
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

console.log(
  "\nAll files migrated. You can now switch to local storage and rebuild.",
);
