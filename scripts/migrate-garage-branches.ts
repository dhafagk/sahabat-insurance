// scripts/migrate-garage-branches.ts
import { getPayload } from "payload";
import config from "../payload.config";

async function migrate() {
  const payload = await getPayload({ config });

  const pageResult = await payload.find({
    collection: "tabel",
    where: { slug: { equals: "garage-list" } },
    limit: 1,
    depth: 0,
  });

  const page = pageResult.docs[0];
  if (!page) {
    console.log('No "garage-list" tabel doc found. Nothing to migrate.');
    process.exit(0);
  }

  const alreadyMigrated = await payload.find({
    collection: "garage-branches",
    where: { page: { equals: page.id } },
    limit: 1,
  });

  if (alreadyMigrated.totalDocs > 0) {
    console.log("garage-branches already has docs for this page. Skipping (idempotent).");
    process.exit(0);
  }

  // Fetch every locale's content at once so no translated copy is lost.
  const source = await payload.findByID({
    collection: "tabel",
    id: page.id,
    locale: "all",
    depth: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tables: any[] = Array.isArray(source.tables) ? source.tables : [];
  console.log(`Migrating ${tables.length} tables into garage-branches...`);

  let created = 0;
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    await payload.create({
      collection: "garage-branches",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locale: "all" as any,
      data: {
        page: page.id,
        title: table.title,
        description: table.description ?? undefined,
        order: i,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columns: (table.columns ?? []).map((c: any) => ({ label: c.label })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows: (table.rows ?? []).map((r: any) => ({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cells: (r.cells ?? []).map((c: any) => ({ value: c.value })),
        })),
      },
    });
    created++;
  }

  if (created !== tables.length) {
    console.error(`Expected to create ${tables.length} docs, created ${created}. Aborting before clearing source data.`);
    process.exit(1);
  }

  await payload.update({
    collection: "tabel",
    id: page.id,
    data: { tables: [] },
  });

  console.log(`Done. Created ${created} garage-branches docs and cleared tabel.tables.`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
