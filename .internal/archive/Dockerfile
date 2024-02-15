# FROM mongo:7.0.5
FROM node:20

# copy data
COPY db/kino_db /srv/kino_db
COPY db/mongod.conf /etc/
COPY db/mongo_init.sh docker-entrypoint-initdb.d/
COPY kino-1.0.0.tgz /tmp/

# install nodejs
RUN apt-get -y update && apt-get -y install zip unzip curl 
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# unpack
RUN mkdir -p /srv/kino 
WORKDIR /srv/kino 
RUN tar -xzf /tmp/kino-1.0.0.tgz && mv package/* . 
RUN npm install

# port 27017 is exposed in mongo img by default
EXPOSE 27017 8000

CMD npm start