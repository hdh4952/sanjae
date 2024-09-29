import { Person } from '../models/Person';
import { Room } from '../models/Room';
import base from './data/base';

const statusOfPersonnel = (() => {
  const rooms = base.map(({ name, people }) => {
    const p = people.map((x) => {
      const [generation, name] = x.split(' ');
      return new Person(generation, name);
    });

    return new Room(name, p);
  });

  return rooms;
})();

export default statusOfPersonnel;
