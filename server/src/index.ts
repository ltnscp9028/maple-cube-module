import { GraphQLServer } from 'graphql-yoga';
import { makeSchema } from 'nexus';
import { PrismaClient } from '@prisma/client';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import type from './resolver';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

const server = new GraphQLServer({
  schema: makeSchema({
    types: type,
    plugins: [
      nexusSchemaPrisma({ experimentalCRUD: true }),
      // nexusSchemaPrisma({ experimentalCRUD: true }),
      // nexusSchemaPrisma({
      //   experimentalCRUD: true,
      // }),
    ],
    outputs: {
      schema: __dirname + '/generated/sch ema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
  }),
  context: (request) => {
    //if (!req.headers.Authorization) return { user: undefined };
    return {
      ...request,
      prisma,
    };
  },
});

// if (process.env.NODE_ENV == 'production') {
//   server.express.get('/', (req, res) => {
//     return res.status(200).send();
//   });
// }

const option = {
  // playground: process.env.NODE_ENV == 'production' ? false : '/',
  playground: '/',
};

server.start(option, async () => {
  await prisma.$connect();
  // checkTimer(admin);
  console.log('Listening on port 4000');
});
