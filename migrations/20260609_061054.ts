import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_manajemen_board_display_order" AS ENUM('directors_first', 'commissioners_first');
    ALTER TABLE "manajemen" ADD COLUMN "board_display_order" "enum_manajemen_board_display_order" DEFAULT 'directors_first';
    ALTER TABLE "manajemen_highlights" DROP CONSTRAINT IF EXISTS "manajemen_highlights_parent_id_fk";
    ALTER TABLE "manajemen_highlights_locales" DROP CONSTRAINT IF EXISTS "manajemen_highlights_locales_parent_id_fk";
    DROP INDEX IF EXISTS "manajemen_highlights_order_idx";
    DROP INDEX IF EXISTS "manajemen_highlights_parent_id_idx";
    DROP INDEX IF EXISTS "manajemen_highlights_locales_locale_parent_id_unique";
    DROP TABLE IF EXISTS "manajemen_highlights_locales";
    DROP TABLE IF EXISTS "manajemen_highlights";
    DROP TYPE IF EXISTS "public"."enum_manajemen_highlights_icon";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "manajemen" DROP COLUMN IF EXISTS "board_display_order";
    DROP TYPE IF EXISTS "public"."enum_manajemen_board_display_order";
    CREATE TYPE "public"."enum_manajemen_highlights_icon" AS ENUM('Star', 'Target', 'Users', 'Shield', 'TrendingUp', 'Trophy');
    CREATE TABLE "manajemen_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "enum_manajemen_highlights_icon" DEFAULT 'Star'
    );
    CREATE TABLE "manajemen_highlights_locales" (
      "title" varchar NOT NULL,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    ALTER TABLE "manajemen_highlights" ADD CONSTRAINT "manajemen_highlights_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "manajemen_highlights_locales" ADD CONSTRAINT "manajemen_highlights_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen_highlights"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "manajemen_highlights_order_idx" ON "manajemen_highlights" USING btree ("_order");
    CREATE INDEX "manajemen_highlights_parent_id_idx" ON "manajemen_highlights" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "manajemen_highlights_locales_locale_parent_id_unique"
      ON "manajemen_highlights_locales" USING btree ("_locale","_parent_id");
  `);
}
