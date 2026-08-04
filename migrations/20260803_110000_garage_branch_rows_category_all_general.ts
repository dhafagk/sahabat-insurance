import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "garage_branch_rows" SET "category" = 'general';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Original per-row category values aren't recoverable once overwritten.
}
