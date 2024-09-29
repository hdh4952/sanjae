import config from './data/config';
import { Organization } from '../models/Organization';
import { Team } from '../models/Team';
import { Person } from '../models/Person';
import { Group } from '../models/Group';

const organization = (() => {
  const groups = config.map((obj, grade) => {
    const groupName = Object.keys(obj)[0];
    const teams = [];

    for (const teamName in obj[groupName]) {
      const peopleInfo = obj[groupName][teamName];
      const people = peopleInfo.map((x) => {
        const [generation, name] = x.split(' ');
        return new Person(generation, name);
      });

      teams.push(new Team(teamName, people.length || 1, people, () => true));
    }

    return new Group(groupName, teams, grade);
  });

  return new Organization(groups);
})();

export default organization;
