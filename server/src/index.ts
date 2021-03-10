import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { PrismaClient } from '@prisma/client';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as path from 'path';
import express from 'express';

import type from './resolver';
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    types: type,
    plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
    sourceTypes: {
      modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
    },
    contextType: {
      module: path.join(__dirname, 'context.ts'),
      export: 'Context',
    },
    outputs: {
      typegen: path.join(__dirname, '/generated/nexus.ts'),
      schema: path.join(__dirname, '/generated/schema.graphql'),
    },
    shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
  }),
});

const app = express();

apollo.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log('GraphQL Server Start');
});

// const server = new GraphQLServer({
//   schema: makeSchema({
//     types: type,
//     shouldGenerateArtifacts:process.env.NODE_ENV===
//     plugins: [
//       nexusSchemaPrisma({ experimentalCRUD: true }),
//       // nexusSchemaPrisma({ experimentalCRUD: true }),
//       // nexusSchemaPrisma({
//       //   experimentalCRUD: true,
//       // }),
//     ],
//     outputs: {
//       schema: __dirname + '/generated/schema.graphql',
//       typegen: __dirname + '/generated/nexus.ts',
//     },
//   }),
//   context: (request) => {
//     //if (!req.headers.Authorization) return { user: undefined };
//     return {
//       ...request,
//       prisma,
//     };
//   },
// });

// // if (process.env.NODE_ENV == 'production') {
// //   server.express.get('/', (req, res) => {
// //     return res.status(200).send();
// //   });
// // }

// const option = {
//   // playground: process.env.NODE_ENV == 'production' ? false : '/',
//   playground: '/',
// };

// server.start(option, async () => {
//   await prisma.$connect();
//   // checkTimer(admin);
//   console.log('Listening on port 4000');
// });
