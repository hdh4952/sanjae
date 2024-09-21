export class Organization {
  #groups;

  constructor(groups) {
    this.#groups = groups;
  }

  get groups() {
    return this.#groups;
  }
}
