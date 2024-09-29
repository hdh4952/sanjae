export const rearrange = (organization, absentPeople = []) => {
  const cleaningSystem = new CleaningSystem(organization);
  cleaningSystem.exclude(absentPeople);
  cleaningSystem.start();
  return cleaningSystem.result;
};

class CleaningSystem {
  constructor(organization) {
    this.remainingPeople = organization
      .find((obj) => obj.id === 4)
      .cleaningAreaList.map((area) => area.assignedPeople)
      .flat();
    this.organization = organization.filter((obj) => obj.id !== 4);
  }

  // 휴가 혹은 근무 중인 인원을 청소 인원에서 제외한다.
  exclude(people) {
    this.organization.map((obj) => {
      obj.cleaningAreaList = obj.cleaningAreaList.map((cleaningArea) => {
        const filtered = cleaningArea.assignedPeople.filter(
          (person) => !people.some((p) => p.name === person.name && p.generation === person.generation),
        );
        return { ...cleaningArea, assignedPeople: filtered };
      });
    });

    const obj = this.organization.find((obj) => obj.id === 0);
    obj.cleaningAreaList.push({
      name: '근무 or 휴가',
      isEnter: () => true,
      maximum: Number.MAX_SAFE_INTEGER,
      assignedPeople: [...people],
    });
  }

  start() {
    for (let i = 3; i > 1; i--) {
      this.arrange(i);
    }

    // 생활관 인원 배치 구현
    const container = this.organization.find((obj) => obj.id === 1);
    for (let i = 0; i < this.remainingPeople.length; i++) {
      for (let j = 0; j < container.cleaningAreaList.length; j++) {
        const curp = container.cleaningAreaList[j].assignedPeople[0];
        if (
          container.cleaningAreaList[j].isEnter(this.remainingPeople[i]) &&
          curp.generation < this.remainingPeople[i].generation
        ) {
          const temp = { ...curp };
          container.cleaningAreaList[j].assignedPeople[0] = { ...this.remainingPeople[i] };
          this.remainingPeople[i] = temp;
        }
      }
    }

    const obj = this.organization.find((obj) => obj.id === 0);
    while (this.remainingPeople.length > 0) {
      obj.cleaningAreaList[0].assignedPeople.push(this.remainingPeople.shift());
    }
  }

  // 청소구역 중 가장 짬이 높은 사람 고르기
  getHighestPerson(cleaningAreaList) {
    const people = cleaningAreaList.map((area) => area.assignedPeople.map((person) => person)).flat();
    return people.reduce(
      (acc, cur) => {
        if (cur.generation < acc.generation) {
          return cur;
        }
        return acc;
      },
      { generation: 10000 },
    );
  }

  // 해당 인원이 포함된 청소구역 고르기
  getCleaningAreaByPerson(cleaningAreaList, person) {
    const result = cleaningAreaList.find((area) =>
      area.assignedPeople.some((p) => p.name === person.name && p.generation === person.generation),
    );
    return result;
  }

  arrange(id) {
    const obj = this.organization.find((obj) => obj.id === id);
    let { idx: areaIdx } = obj.cleaningAreaList.reduce(
      (pre, cur, i) => {
        const gap = cur.maximum - cur.assignedPeople.length;
        if (pre.gap < gap) {
          return { gap, idx: i };
        } else {
          return pre;
        }
      },
      { gap: 0, idx: -1 },
    );

    while (areaIdx !== -1 && this.remainingPeople.length > 0) {
      obj.cleaningAreaList[areaIdx].assignedPeople.push(this.remainingPeople.shift());

      areaIdx = obj.cleaningAreaList.reduce(
        (pre, cur, i) => {
          const gap = cur.maximum - cur.assignedPeople.length;
          if (pre.gap < gap) {
            return { gap, idx: i };
          } else {
            return pre;
          }
        },
        { gap: 0, idx: -1 },
      ).idx;
    }

    // const maxAreaLength = obj.cleaningAreaList.length;
    // for (let i = 0; i < maxAreaLength; i++) {
    //   if (
    //     obj.cleaningAreaList[i].maximum > obj.cleaningAreaList[i].assignedPeople.length &&
    //     this.remainingPeople.length > 0 &&
    //     obj.cleaningAreaList[i].isEnter(this.remainingPeople[0])
    //   ) {
    //     obj.cleaningAreaList[i].assignedPeople.push(this.remainingPeople.shift());
    //   }
    // }

    // 짬순으로 한명씩 검사한 이후 remainingPeople에 있는 인원이 들어갈 수 있고, 짬이 낮으면 바꿈
    let isChanged = true;
    while (isChanged) {
      isChanged = false;
      const highestPerson = this.getHighestPerson(obj.cleaningAreaList);
      const { name } = this.getCleaningAreaByPerson(obj.cleaningAreaList, highestPerson);
      const cleaningArea = obj.cleaningAreaList.find((area) => area.name === name);
      for (let i = 0; i < this.remainingPeople.length; i++) {
        if (
          highestPerson.generation < this.remainingPeople[i].generation &&
          cleaningArea.isEnter(this.remainingPeople[i])
        ) {
          const temp = { ...this.remainingPeople[i] };
          this.remainingPeople[i] = { ...highestPerson };
          cleaningArea.assignedPeople = cleaningArea.assignedPeople.filter(
            (p) => !(p.name === highestPerson.name && p.generation === highestPerson.generation),
          );
          cleaningArea.assignedPeople.push(temp);
          isChanged = true;
          break;
        }
      }
    }
  }

  get result() {
    return this.organization;
  }
}
