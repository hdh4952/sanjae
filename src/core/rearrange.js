export const rearrange = (organization, absentPeople) => {
  const cleaningSystem = new CleaningSystem(organization);
  cleaningSystem.exclude(absentPeople);
  cleaningSystem.arrangeRemainingPeople(4);
  return cleaningSystem.result;
};

class CleaningSystem {
  constructor(organization) {
    this.organization = organization;
  }

  // 휴가 혹은 근무 중인 인원을 청소 인원에서 제외한다.
  exclude(people) {
    console.log(people);
  }

  arrangeRemainingPeople(id) {
    const remainingPeople = this.getRemainingPeople(id);
    this.removeRemainingArea(id);
    console.log(remainingPeople);
  }

  getRemainingPeople(id) {
    const { cleaningAreaList } = this.organization.find((obj) => obj.id === id);
    console.log(cleaningAreaList);
    return cleaningAreaList
      .map((obj) =>
        obj.assignedPeople.map(({ name, generation }) => ({
          name,
          generation,
        })),
      )
      .flat();
  }

  removeRemainingArea(id) {
    const obj = this.organization.find((obj) => obj.id === id);
    obj.cleaningAreaList.forEach((cleaningArea) => {
      while (cleaningArea.assignedPeople.length > cleaningArea.maximum) {
        cleaningArea.assignedPeople.pop();
      }
    });

    this.organization = [...this.organization.filter((obj) => obj.id !== id), obj];
  }

  get result() {
    return this.organization;
  }
}
