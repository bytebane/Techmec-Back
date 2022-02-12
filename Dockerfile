# FROM node:latest
FROM node:16.14.0

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js"]