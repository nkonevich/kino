#!/bin/bash

rm -rf db/kino_db
./mongo_tools/mongodump.exe -d kino_db -o ../db

npm pack