#!/bin/bash

# requires: node 20.x, npm, mongodb

npm ci
./db_dump/mongo_tools/mongorestore -d kino_db db_dump/kino_db
