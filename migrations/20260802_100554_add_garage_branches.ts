import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_garage_branches_category" AS ENUM('authorize', 'general');
  CREATE TABLE "garage_branches_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "garage_branches_columns_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "garage_branches_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "garage_branches_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "garage_branches_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "garage_branches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" integer NOT NULL,
  	"category" "enum_garage_branches_category",
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "garage_branches_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "garage_branches_id" integer;
  ALTER TABLE "garage_branches_columns" ADD CONSTRAINT "garage_branches_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branches_columns_locales" ADD CONSTRAINT "garage_branches_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branches_rows_cells" ADD CONSTRAINT "garage_branches_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branches_rows_cells_locales" ADD CONSTRAINT "garage_branches_rows_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branches_rows" ADD CONSTRAINT "garage_branches_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garage_branches" ADD CONSTRAINT "garage_branches_page_id_tabel_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."tabel"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garage_branches_locales" ADD CONSTRAINT "garage_branches_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garage_branches"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "garage_branches_columns_order_idx" ON "garage_branches_columns" USING btree ("_order");
  CREATE INDEX "garage_branches_columns_parent_id_idx" ON "garage_branches_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "garage_branches_columns_locales_locale_parent_id_unique" ON "garage_branches_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garage_branches_rows_cells_order_idx" ON "garage_branches_rows_cells" USING btree ("_order");
  CREATE INDEX "garage_branches_rows_cells_parent_id_idx" ON "garage_branches_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "garage_branches_rows_cells_locales_locale_parent_id_unique" ON "garage_branches_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garage_branches_rows_order_idx" ON "garage_branches_rows" USING btree ("_order");
  CREATE INDEX "garage_branches_rows_parent_id_idx" ON "garage_branches_rows" USING btree ("_parent_id");
  CREATE INDEX "garage_branches_page_idx" ON "garage_branches" USING btree ("page_id");
  CREATE INDEX "garage_branches_updated_at_idx" ON "garage_branches" USING btree ("updated_at");
  CREATE INDEX "garage_branches_created_at_idx" ON "garage_branches" USING btree ("created_at");
  CREATE UNIQUE INDEX "garage_branches_locales_locale_parent_id_unique" ON "garage_branches_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_garage_branches_fk" FOREIGN KEY ("garage_branches_id") REFERENCES "public"."garage_branches"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_garage_branches_id_idx" ON "payload_locked_documents_rels" USING btree ("garage_branches_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "garage_branches_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches_rows_cells_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "garage_branches_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "garage_branches_columns" CASCADE;
  DROP TABLE "garage_branches_columns_locales" CASCADE;
  DROP TABLE "garage_branches_rows_cells" CASCADE;
  DROP TABLE "garage_branches_rows_cells_locales" CASCADE;
  DROP TABLE "garage_branches_rows" CASCADE;
  DROP TABLE "garage_branches" CASCADE;
  DROP TABLE "garage_branches_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_garage_branches_fk";

  DROP INDEX "payload_locked_documents_rels_garage_branches_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "garage_branches_id";
  DROP TYPE "public"."enum_garage_branches_category";`)
}
