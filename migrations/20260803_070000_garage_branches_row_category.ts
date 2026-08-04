import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "garage_branches_rows" ADD COLUMN "category" "enum_garage_branches_category";
  UPDATE "garage_branches_rows" r SET "category" = g."category" FROM "garage_branches" g WHERE r."_parent_id" = g."id";
  ALTER TABLE "garage_branches" DROP COLUMN "category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "garage_branches" ADD COLUMN "category" "enum_garage_branches_category";
  UPDATE "garage_branches" g SET "category" = sub."category" FROM (
    SELECT DISTINCT ON ("_parent_id") "_parent_id", "category" FROM "garage_branches_rows" ORDER BY "_parent_id", "_order"
  ) sub WHERE g."id" = sub."_parent_id";
  ALTER TABLE "garage_branches_rows" DROP COLUMN "category";`)
}
