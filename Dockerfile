FROM node:20

WORKDIR /srv/kino 
COPY . .
RUN npm ci

EXPOSE 8000
CMD ["npm", "start"]