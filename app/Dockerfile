FROM node:alpine

WORKDIR /app
ADD . /app

RUN npm install

CMD ["node", "bin/cluster.js"]