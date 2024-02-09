#!/bin/bash

# requires: node 20.x, npm, mongodb


npm ci
rm -rf kino_db
./db_dump/mongo_tools/mongodump -d kino_db -o db_dump