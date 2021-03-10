import objectType from './objectType';
import queryType from './query';
import mutation from './mutation';
import { makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as path from 'path';

const type = [objectType, queryType, mutation];

export default makeSchema({
  types: type,
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: path.join(__dirname, '../generated/nexus.ts'),
    schema: path.join(__dirname, '../generated/schema.graphql'),
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'prisma',
      },
    ],
  },
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
});
