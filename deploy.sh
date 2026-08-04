#!/usr/bin/env bash
# One-for-all prod start: install, build, migrate, (re)start under PM2, persist.
set -euo pipefail
cd "$(dirname "$0")"

npm ci
npm run build
npm run migrate

# reload if already running, else start fresh
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs

# persist process list so it comes back after a reboot
pm2 save

echo "Done."
# echo "Done. Run 'pm2 startup' ONCE on this server (as instructed by its output) so PM2 auto-boots."
