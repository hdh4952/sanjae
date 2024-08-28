export const rearrange = (organization, absentPeople) => {
  const cleaningSystem = new CleaningSystem(organization);
  cleaningSystem.exclude(absentPeople);
  cleaningSystem.arrangeRemainingPeople(4);
  console.log(cleaningSystem.result);
  cleaningSystem.arrangeRemainingPeople(3);
  console.log(cleaningSystem.result);
  cleaningSystem.arrangeRemainingPeople(2);
  console.log(cleaningSystem.result);
  cleaningSystem.arrangeRemainingPeople(1);
  console.log(cleaningSystem.result);
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

  // id에 해당하는 청소구역의 남는 인원을 위쪽 청소구역에 배정한다.
  arrangeRemainingPeople(id) {
    const remainingPeople = this.getRemainingPeople(id);
    this.removeRemainingArea(id);
    this.arrange(id - 1, [...remainingPeople]);
  }

  // 현재 청소구역의 남는 인원을 구한다.
  getRemainingPeople(id) {
    const { cleaningAreaList } = this.organization.find((obj) => obj.id === id);
    console.log(cleaningAreaList);
    return cleaningAreaList
      .map((obj) => {
        const result = [];
        while (obj.assignedPeople.length > obj.maximum) {
          result.push(obj.assignedPeople.shift());
        }
        return result;
      })
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

  arrange(id, remainingPeople) {
    const obj = this.organization.find((obj) => obj.id === id);
    // 최대 인원이 아닌 청소구역에 배치
    obj.cleaningAreaList.forEach((cleaningArea) => {
      if (remainingPeople.length > 0 && cleaningArea.assignedPeople.length < cleaningArea.maximum) {
        const person = remainingPeople.shift();
        cleaningArea.assignedPeople.push(person);
      }
    });
    // 짬순 높은 사람이 있는 곳에 인원 배치
    const generationAndAreaNameObj = obj.cleaningAreaList
      .map((area) => area.assignedPeople.map((person) => ({ generation: person.generation, areaName: area.name })))
      .flat();
    generationAndAreaNameObj.sort((a, b) => a.generation - b.generation);

    while (remainingPeople.length > 0) {
      const person = remainingPeople.shift();
      const { areaName } = generationAndAreaNameObj.shift();
      generationAndAreaNameObj.push({ areaName });
      const area = obj.cleaningAreaList.find((area) => area.name === areaName);
      area.assignedPeople.push(person);
    }

    this.organization = [...this.organization.filter((obj) => obj.id !== id), obj];
  }

  get result() {
    return this.organization;
  }
}
