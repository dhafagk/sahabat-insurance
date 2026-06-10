import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "landing_page_hero_title_lines" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "highlight" boolean DEFAULT false
    );

    CREATE TABLE "landing_page_hero_title_lines_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "landing_page_hero_title_lines"
      ADD CONSTRAINT "landing_page_hero_title_lines_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "landing_page_hero_title_lines_locales"
      ADD CONSTRAINT "landing_page_hero_title_lines_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_hero_title_lines"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "landing_page_hero_title_lines_order_idx"
      ON "landing_page_hero_title_lines" USING btree ("_order");

    CREATE INDEX "landing_page_hero_title_lines_parent_id_idx"
      ON "landing_page_hero_title_lines" USING btree ("_parent_id");

    CREATE UNIQUE INDEX "landing_page_hero_title_lines_locales_locale_parent_id_unique"
      ON "landing_page_hero_title_lines_locales" USING btree ("_locale", "_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "landing_page_hero_title_lines_locales_locale_parent_id_unique";
    DROP INDEX IF EXISTS "landing_page_hero_title_lines_parent_id_idx";
    DROP INDEX IF EXISTS "landing_page_hero_title_lines_order_idx";
    ALTER TABLE "landing_page_hero_title_lines_locales"
      DROP CONSTRAINT IF EXISTS "landing_page_hero_title_lines_locales_parent_id_fk";
    ALTER TABLE "landing_page_hero_title_lines"
      DROP CONSTRAINT IF EXISTS "landing_page_hero_title_lines_parent_id_fk";
    DROP TABLE IF EXISTS "landing_page_hero_title_lines_locales";
    DROP TABLE IF EXISTS "landing_page_hero_title_lines";
  `);
}
