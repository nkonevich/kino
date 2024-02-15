#!/bin/bash

docker build . -t kino
docker run --rm -it -p 27018:27018/tcp -p 8000:8000/tcp kino:latest 