import { queryType } from 'nexus';

const item = queryType({
  definition(t) {
    t.list.field('items', {
      type: 'item',
      resolve(source, args, context, info) {
        return context.prisma.item.findMany();
      },
    });
  },
});

export default item;
