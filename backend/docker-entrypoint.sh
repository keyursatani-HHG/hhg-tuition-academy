#!/usr/bin/env bash
set -e

# Apply database migrations before serving (idempotent).
echo "Running database migrations..."
alembic upgrade head

echo "Starting server: $*"
exec "$@"
