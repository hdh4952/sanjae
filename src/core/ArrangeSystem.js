import { Group } from '../models/Group';
import { Organization } from '../models/Organization';
import { Person } from '../models/Person';
import { Team } from '../models/Team';

export class ArrangeSystem {
  #organization;
  #rooms;
  #remainingPeople;

  constructor(organization, rooms) {
    if (!(organization instanceof Organization)) {
      throw new Error('organization is not instance of Organization');
    }

    this.#organization = organization;
    this.#rooms = rooms;
    this.#remainingPeople = [];
  }

  exclude() {
    const people = [];

    this.#organization.groups.forEach((group) => {
      group.teams.forEach((team) => {
        let found = team.people.find((person) => person.state !== 'on');
        while (found) {
          const person = team.removePerson(found);
          people.push(person);

          found = team.people.find((person) => person.state !== 'on');
        }
      });
    });

    const team = new Team('휴가 or 근무', Number.MAX_SAFE_INTEGER, people);
    this.#organization.groups.find((group) => group.grade === 0).teams.push(team);
  }

  findRemainingPeople() {
    const team = this.#organization.groups.find((group) => group.grade === 0).teams[0];
    while (team.people.length !== 0) {
      this.#remainingPeople.push(team.removePerson(team.people[0]));
    }

    const group = this.#organization.groups.find((group) => group.grade === 4);
    group.teams.forEach((team) => {
      while (team.people.length !== 0) {
        this.#remainingPeople.push(team.removePerson(team.people[0]));
      }
    });
  }

  popTheLowestPerson(people) {
    if (people.length === 0) {
      return null;
    }

    const idx = people.reduce((prev, curr, idx, arr) => {
      if (curr.compareTo(arr[prev]) < 0) {
        return idx;
      }
      return prev;
    }, 0);

    const [removed] = people.splice(idx, 1);
    return removed;
  }

  arrange(group) {
    while (group.teams.some((team) => team.limit - team.people.length > 0) && this.#remainingPeople.length > 0) {
      let need = 0;
      let grade = 0;
      let selectedIdx = 0;
      group.teams.forEach((team, idx) => {
        const cmpNeed = team.limit - team.people.length;
        if (cmpNeed < need || (cmpNeed === need && team.grade < grade)) {
          return;
        }

        grade = team.grade;
        selectedIdx = idx;
      });

      const selectedTeam = group.teams[selectedIdx];
      selectedTeam.insertPerson(this.popTheLowestPerson(this.#remainingPeople));
    }

    while (this.#remainingPeople.length > 0) {
      const lowest = this.popTheLowestPerson(this.#remainingPeople);
      const [teamIdx, highest] = group.teams.reduce((prev, currTeam, idx) => {
        if (idx === 0) {
          let result = 0;
          currTeam.people.forEach((person, i, arr) => {
            if (person.compareTo(arr[result]) > 0) {
              result = i;
            }
          });

          return [idx, currTeam.people[result]];
        }

        let result = prev;
        currTeam.people.forEach((person) => {
          if (person.compareTo(result[1]) > 0) {
            result = [idx, person];
          }
        });

        return result;
      }, []);

      if (lowest.compareTo(highest) >= 0) {
        this.#remainingPeople.push(lowest);
        break;
      }

      const team = group.teams[teamIdx];
      const removed = team.removePerson(highest);
      this.#remainingPeople.push(removed);
      team.insertPerson(lowest);
    }
  }

  arrangeInRooms() {
    // grade가 1인 group은 생활관 group이므로 각 생활관에 사는 사람들만 들어갈 수 있다.
    const group = this.#organization.groups.find((group) => group.grade === 1);
    const temp = [];

    while (this.#remainingPeople.length > 0) {
      const person = this.#remainingPeople.shift();
      const team = group.teams.find((team) => {
        const room = this.#rooms.find((room) => room.name === team.name);
        return room.isLiving(person);
      });

      if (team.people.length === 0) {
        team.insertPerson(person);
      } else {
        if (team.people[0].compareTo(person) > 0) {
          temp.push(team.removePerson(team.people[0]));
          team.insertPerson(person);
        } else {
          temp.push(person);
        }
      }
    }

    while (temp.length > 0) {
      this.#remainingPeople.push(temp.shift());
    }
  }

  arrangeRemaining() {
    const group = this.#organization.groups.find((group) => group.grade === 0);
    const team = group.teams.find((team) => team.name === '짬킹');

    while (this.#remainingPeople.length > 0) {
      team.insertPerson(this.#remainingPeople.shift());
    }
  }

  start() {
    this.exclude();
    this.findRemainingPeople();

    for (let grade = 3; grade > 1; grade--) {
      const group = this.#organization.groups.find((group) => group.grade === grade);
      this.arrange(group);
    }

    this.arrangeInRooms();
    this.arrangeRemaining();
  }

  get result() {
    const newOrganization = (() => {
      const groups = this.#organization.groups.map((group) => {
        const groupName = group.name;
        const teams = group.teams.map((team) => {
          const teamName = team.name;
          const teamLimit = team.limit;
          const people = team.people.map((person) => new Person(person.generation, person.name, person.state));
          const isEnter = team.isEnter;
          const teamGrade = team.grade;

          return new Team(teamName, teamLimit, people, isEnter, teamGrade);
        });
        const groupGrade = group.grade;

        return new Group(groupName, teams, groupGrade);
      });

      return new Organization(groups);
    })();

    return newOrganization;
  }
}
