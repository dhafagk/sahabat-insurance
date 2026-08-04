import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

// Adds a `name` field to garage-branch-rows (auto-mirrored from the first
// cell's value via a beforeChange hook) so the admin's Baris Data table can
// show which bengkel a row is, instead of just category/order.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "garage_branch_rows_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "garage_branch_rows_locales" ADD CONSTRAINT "garage_branch_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branch_rows"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "garage_branch_rows_locales_locale_parent_id_unique" ON "garage_branch_rows_locales" USING btree ("_locale","_parent_id");

  INSERT INTO "garage_branch_rows_locales" ("name", "_locale", "_parent_id")
  SELECT cl."value", cl."_locale", c."_parent_id"
  FROM "garage_branch_rows_cells" c
  JOIN "garage_branch_rows_cells_locales" cl ON cl."_parent_id" = c."id"
  WHERE c."_order" = 1;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "garage_branch_rows_locales" CASCADE;`)
}
