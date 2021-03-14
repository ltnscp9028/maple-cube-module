import { objectType } from 'nexus';

const cube = objectType({
  name: 'cube',
  definition(t) {
    t.model.cube_id();
    t.model.cube_type();
    t.model.cube_probability();
  },
});

export default cube;
