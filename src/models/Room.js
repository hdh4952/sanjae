import { Person } from './Person';

export class Room {
  #name;
  #people;

  constructor(name, people) {
    this.#name = name;
    this.#people = people;
  }

  isLiving(person) {
    if (!(person instanceof Person)) {
      throw new Error('person is not instance of Person');
    }

    return this.#people.some((p) => p.compareTo(person) === 0);
  }

  insertPerson(person) {
    if (!(person instanceof Person)) {
      throw new Error('person is not instance of Person');
    }

    this.#people.push(person);
  }

  removePerson(person) {
    if (!(person instanceof Person)) {
      throw new Error('person is not instance of Person');
    }

    const idx = this.#people.findIndex((p) => person.compareTo(p) === 0);

    const removed = this.#people.splice(idx, 1);
    if (removed.length === 0) {
      return null;
    }
    return removed[0];
  }

  get name() {
    return this.#name;
  }

  get people() {
    return this.#people;
  }
}
