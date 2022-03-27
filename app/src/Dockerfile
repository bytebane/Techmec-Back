# FROM node:14.19.0
FROM node:alpine

RUN mkdir -p /var/app/src

WORKDIR /var/app/src

COPY package*.json .

RUN npm ci

COPY . .

RUN chmod +x ./wait-for.sh ./docker-entrypoint.sh

EXPOSE 3000

# Add this line
# It _must_ use the JSON-array syntax
ENTRYPOINT ["./docker-entrypoint.sh","mongo_db","27017"]

CMD [ "node", "server.js"]