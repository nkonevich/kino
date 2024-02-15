FROM node:20

WORKDIR /srv/kino 
COPY . .
RUN npm ci

CMD ["npm", "start"]