FROM node:12

WORKDIR /home/node/app

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN yarn

COPY . .

RUN yarn global add pm2

ENV NODE_ENV production

RUN npx prisma generate --schema ./server/prisma/schema.prisma

EXPOSE 4000

CMD ["yarn","run","serve"]
