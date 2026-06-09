import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" ADD COLUMN "slug" varchar;
    CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
    ALTER TABLE "products_locales" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "products_locales" ALTER COLUMN "description" DROP NOT NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "products_slug_idx";
    ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
    ALTER TABLE "products_locales" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "products_locales" ALTER COLUMN "description" SET NOT NULL;
  `);
}
