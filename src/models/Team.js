import { Person } from './Person';

export class Team {
  #name;
  #limit;
  #people;
  #isEnter;
  #grade;

  constructor(name, limit, people = [], isEnter = () => true, grade = 0) {
    this.#name = name;
    this.#limit = limit;
    this.#people = people;
    this.#isEnter = isEnter;
    this.#grade = grade;
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

  get limit() {
    return this.#limit;
  }

  set limit(num) {
    this.#limit = num;
  }

  get people() {
    return this.#people;
  }

  get isEnter() {
    return this.#isEnter;
  }

  set isEnter(func) {
    this.#isEnter = func;
  }

  get grade() {
    return this.#grade;
  }
}
