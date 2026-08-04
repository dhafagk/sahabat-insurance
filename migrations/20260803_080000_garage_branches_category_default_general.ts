import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "garage_branches_rows" SET "category" = 'general' WHERE "category" IS NULL;
  ALTER TABLE "garage_branches_rows" ALTER COLUMN "category" SET DEFAULT 'general';
  ALTER TABLE "garage_branches_rows" ALTER COLUMN "category" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "garage_branches_rows" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "garage_branches_rows" ALTER COLUMN "category" DROP DEFAULT;`)
}
