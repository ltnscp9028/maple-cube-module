FROM node:12

WORKDIR /home/node/app

COPY ./server/package.json ./
COPY ./server/yarn.lock ./
COPY ./server/tsconfig.json ./

RUN yarn

COPY . .

RUN yarn global add pm2

ENV NODE_ENV production

RUN npx prisma generate --schema ./server/prisma/schema.prisma

RUN yarn run build

EXPOSE 4000

CMD ["/bin/sh", "-c", "pm2-runtime 'npm start'"]
