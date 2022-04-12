FROM node:16-alpine3.15

WORKDIR /usr/src/app

ENV TV_IP=
ENV TV_PORT=

EXPOSE 3000

RUN apk update
RUN apk add busybox-extras

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

CMD [ "node", "index.js" ]