import { queryType } from 'nexus';

const item = queryType({
  definition(t) {
    t.crud.item(), t.crud.items();
  },
});

export default item;
