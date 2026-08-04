#!/usr/bin/env bash
# Runs ON the prod server (invoked over SSH by sync-garage-data.sh). Reads
# DATABASE_URL from this server's own .env — prod credentials never leave
# the server, never get typed on a laptop.
set -euo pipefail
cd "$(dirname "$0")/.."

DUMP_FILE="${1:?usage: sync-garage-data-remote.sh <dump-file>}"

set -a
source .env
set +a
: "${DATABASE_URL:?DATABASE_URL not set in .env}"

STAMP="$(date +%Y%m%d_%H%M%S)"
PROD_BACKUP="prod-backup_${STAMP}.dump"

echo "==> Backing up prod DB to ${PROD_BACKUP} (safety net)"
pg_dump "$DATABASE_URL" -F c -f "$PROD_BACKUP"

echo "==> Restoring ${DUMP_FILE} (single transaction: all-or-nothing)"
pg_restore --data-only --single-transaction --disable-triggers \
  -d "$DATABASE_URL" "$DUMP_FILE"

echo "==> Resetting sequences"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
SELECT setval(pg_get_serial_sequence('garage_branches','id'), COALESCE((SELECT MAX(id) FROM garage_branches),1));
SELECT setval(pg_get_serial_sequence('garage_branches_locales','id'), COALESCE((SELECT MAX(id) FROM garage_branches_locales),1));
SELECT setval(pg_get_serial_sequence('garage_branches_columns_locales','id'), COALESCE((SELECT MAX(id) FROM garage_branches_columns_locales),1));
SELECT setval(pg_get_serial_sequence('garage_branch_rows','id'), COALESCE((SELECT MAX(id) FROM garage_branch_rows),1));
SELECT setval(pg_get_serial_sequence('garage_branch_rows_locales','id'), COALESCE((SELECT MAX(id) FROM garage_branch_rows_locales),1));
SELECT setval(pg_get_serial_sequence('garage_branch_rows_cells_locales','id'), COALESCE((SELECT MAX(id) FROM garage_branch_rows_cells_locales),1));
SQL

echo "==> Clearing old 'Daftar Bengkel' tabel.tables array (matches local, superseded by garage-branches)"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c \
  "DELETE FROM tabel_tables WHERE _parent_id = (SELECT id FROM tabel WHERE slug = 'garage-list');"

echo "==> Done. Prod backup: ${PROD_BACKUP}"
