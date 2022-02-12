FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package*.json .

RUN npm install -g n
RUN n 16.13.2
RUN npm install -g npm@8.1.2
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js"]