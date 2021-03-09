FROM node:12

WORKDIR /home/node/app

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

COPY . .

RUN yarn global add pm2

ENV NODE_ENV production

RUN yarn prisma generate

EXPOSE 4000

CMD ["yarn","serve"]
