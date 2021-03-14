import { objectType } from 'nexus';

const cubeProbability = objectType({
  name: 'cube_probability',
  definition(t) {
    t.model.cube_probability_id();
    t.model.cube_id();
    t.model.cube();
  },
});

export default cubeProbability;
