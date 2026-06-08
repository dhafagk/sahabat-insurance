/**
 * Download all files from Vercel Blob to local disk (public/media/).
 *
 *   node scripts/migrate-blob-to-local.mjs
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env
 * Safe to re-run — already-downloaded files are skipped.
 */

import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

function loadEnv() {
  try {
    const content = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    console.warn("Warning: could not read .env — falling back to process.env");
  }
}

loadEnv();

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!BLOB_TOKEN) {
  console.error("Error: BLOB_READ_WRITE_TOKEN must be set in .env");
  process.exit(1);
}

const mediaDir = path.resolve(fileURLToPath(new URL("../media", import.meta.url)));
mkdirSync(mediaDir, { recursive: true });
console.log(`Output directory: ${mediaDir}\n`);

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
    if (!res.ok) throw new Error(`Vercel Blob API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    blobs.push(...(data.blobs ?? []));
    cursor = data.hasMore ? data.cursor : null;
  } while (cursor);
  return blobs;
}

console.log("Fetching blob list from Vercel...");
const blobs = await listAllBlobs();
console.log(`Found ${blobs.length} blob(s)\n`);

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const blob of blobs) {
  const filename = path.basename(blob.pathname);
  const destPath = path.join(mediaDir, filename);

  if (existsSync(destPath)) {
    console.log(`  Skip (exists): ${filename}`);
    skipped++;
    continue;
  }

  process.stdout.write(`  Downloading ${filename} ... `);
  try {
    const res = await fetch(blob.url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
    console.log("ok");
    downloaded++;
  } catch (err) {
    console.log(`FAILED (${err.message})`);
    failed++;
  }
}

console.log(`\n${"─".repeat(40)}`);
console.log(`Downloaded : ${downloaded}`);
console.log(`Skipped    : ${skipped}`);
console.log(`Failed     : ${failed}`);
