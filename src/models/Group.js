import { Team } from './Team';

export class Group {
  #name;
  #teams;
  #grade;

  constructor(name, teams = [], grade = 0) {
    this.#name = name;
    this.#teams = teams;
    this.#grade = grade;
  }

  insertTeam(team) {
    if (!(team instanceof Team)) {
      throw new Error('team is not instance of Team');
    }

    this.#teams.push(team);
  }

  removeTeam(team) {
    if (!(team instanceof Team)) {
      throw new Error('team is not instance of Team');
    }

    const idx = this.#teams.findIndex((t) => team.name === t.name);

    const removed = this.#teams.splice(idx, 1);
    if (removed.length === 0) {
      return null;
    }
    return removed[0];
  }

  get name() {
    return this.#name;
  }

  get teams() {
    return this.#teams;
  }

  get grade() {
    return this.#grade;
  }
}
