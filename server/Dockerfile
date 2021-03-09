FROM node:12

WORKDIR /home/node/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .

RUN yarn global add pm2

ENV NODE_ENV production

RUN npx prisma generate

EXPOSE 4000

CMD ["yarn","serve"]
