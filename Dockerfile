FROM node:18.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json package-lock.json knexfile.js ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3100

CMD ["node", "server.js"]