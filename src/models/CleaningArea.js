export class CleaningArea {
  constructor(name, maximum, allottedPersonnel) {
    this.name = name;
    this.maximum = maximum;
    this.allottedPersonnel = new Set(allottedPersonnel);
  }

  assgin(person) {
    this.allottedPersonnel.add(person);
  }
}
