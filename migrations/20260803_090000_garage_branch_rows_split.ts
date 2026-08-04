import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

// Splits garage_branches.rows (an embedded array, up to 5000 rows/doc) into
// its own `garage_branch_rows` collection so the admin edit screen doesn't
// have to mount every row's form state at once. Old tables are left in place
// (untouched, just no longer shown in the admin UI) so no data is lost.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_garage_branch_rows_category" AS ENUM('authorize', 'general');

  CREATE TABLE "garage_branch_rows" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"branch_id" integer NOT NULL,
  	"order" numeric,
  	"category" "enum_garage_branch_rows_category" DEFAULT 'general' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "garage_branch_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "garage_branch_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "garage_branch_rows_id" integer;

  ALTER TABLE "garage_branch_rows" ADD CONSTRAINT "garage_branch_rows_branch_id_garage_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."garage_branches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garage_branch_rows_cells" ADD CONSTRAINT "garage_branch_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branch_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branch_rows_cells_locales" ADD CONSTRAINT "garage_branch_rows_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branch_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_garage_branch_rows_fk" FOREIGN KEY ("garage_branch_rows_id") REFERENCES "public"."garage_branch_rows"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "garage_branch_rows_branch_idx" ON "garage_branch_rows" USING btree ("branch_id");
  CREATE INDEX "garage_branch_rows_updated_at_idx" ON "garage_branch_rows" USING btree ("updated_at");
  CREATE INDEX "garage_branch_rows_created_at_idx" ON "garage_branch_rows" USING btree ("created_at");
  CREATE INDEX "garage_branch_rows_cells_order_idx" ON "garage_branch_rows_cells" USING btree ("_order");
  CREATE INDEX "garage_branch_rows_cells_parent_id_idx" ON "garage_branch_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "garage_branch_rows_cells_locales_locale_parent_id_unique" ON "garage_branch_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_garage_branch_rows_id_idx" ON "payload_locked_documents_rels" USING btree ("garage_branch_rows_id");

  -- Copy every existing embedded row into the new collection. A temp
  -- column carries the old (varchar) row id just long enough to remap the
  -- cells' parent references to the new (serial) row id, then gets dropped.
  ALTER TABLE "garage_branch_rows" ADD COLUMN "_legacy_row_id" varchar;

  INSERT INTO "garage_branch_rows" ("branch_id", "order", "category", "_legacy_row_id")
  SELECT r."_parent_id", r."_order", r."category"::text::"enum_garage_branch_rows_category", r."id"
  FROM "garage_branches_rows" r;

  INSERT INTO "garage_branch_rows_cells" ("_order", "_parent_id", "id")
  SELECT c."_order", n."id", c."id"
  FROM "garage_branches_rows_cells" c
  JOIN "garage_branch_rows" n ON n."_legacy_row_id" = c."_parent_id";

  INSERT INTO "garage_branch_rows_cells_locales" ("value", "_locale", "_parent_id")
  SELECT "value", "_locale", "_parent_id"
  FROM "garage_branches_rows_cells_locales";

  ALTER TABLE "garage_branch_rows" DROP COLUMN "_legacy_row_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_garage_branch_rows_fk";
  DROP INDEX "payload_locked_documents_rels_garage_branch_rows_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "garage_branch_rows_id";

  DROP TABLE "garage_branch_rows_cells_locales" CASCADE;
  DROP TABLE "garage_branch_rows_cells" CASCADE;
  DROP TABLE "garage_branch_rows" CASCADE;
  DROP TYPE "public"."enum_garage_branch_rows_category";`)
}
