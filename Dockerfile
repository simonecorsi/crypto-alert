FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /home/node/app

COPY . .

RUN npm ci

CMD ["node", "src/index.js"]
