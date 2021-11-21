/* eslint-disable no-unused-vars */
import faker from 'faker';
import { sample } from 'lodash';
// utils

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  amount1: faker.finance.amount(),
  amount2: faker.finance.amount(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ]),
  items: faker.commerce.product()
}));

export default users;
