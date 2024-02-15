# KINO|FILMBUY

## start service

```
docker compose up
``` 
*requires Windows Docker Desktop or manual installation  

## mongo

* dump db
    ```
    ./.internal/mongo_tools/mongodump.exe -d kino_db -o db
    ```
* restore/import db
    ```
    ./.internal/mongo_tools/mongorestore.exe -d kino_db db/kino_db
    ```