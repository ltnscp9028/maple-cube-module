import { objectType } from 'nexus';

const item = objectType({
  name: 'item',
  definition(t) {
    t.nonNull.int('item_id');
    t.nonNull.string('item_name');
  },
});

export default item;
