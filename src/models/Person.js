export class Person {
  #generation;
  #name;
  #state; // 일과, 휴가, 근무 {on, off, work}

  constructor(generation, name, state = 'on') {
    this.#generation = Number.parseInt(generation);
    this.#name = name;
    this.#state = state;
  }

  // this의 짬이 높다면 양수 반환
  compareTo(other) {
    if (!(other instanceof Person)) {
      throw new Error('other is not instance of Person');
    }

    if (this.#generation !== other.#generation) {
      return other.generation - this.generation;
    }

    if (this.#name !== other.#name) {
      if (this.#name < other.#name) {
        return 1;
      }
      return -1;
    }

    return 0;
  }

  get name() {
    return this.#name;
  }

  get generation() {
    return this.#generation;
  }

  get state() {
    return this.#state;
  }

  set state(s) {
    this.#state = s;
  }
}
