import { objectType } from 'nexus';

const item = objectType({
  name: 'item',
  definition(t) {
    t.model.item_id();
    t.model.item_name();
  },
});

export default item;
