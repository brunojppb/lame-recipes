#!/bin/bash

# Abort script upon any command failure
set -euo pipefail

cd /app/backend
npm run migratedb
npm run serve