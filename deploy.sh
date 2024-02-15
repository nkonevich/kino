#!/bin/bash
set -e

# rm -rf db/kino_db
bash ./.internal/mongo_tools/mongodump -d kino_db -o db
docker compose up