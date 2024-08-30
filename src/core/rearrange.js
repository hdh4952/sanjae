// export const rearrange = (organization, absentPeople) => {
//   const cleaningSystem = new CleaningSystem(organization);
//   cleaningSystem.exclude(absentPeople);
//   // cleaningSystem.arrangeRemainingPeople(4);
//   // console.log(cleaningSystem.result);
//   // cleaningSystem.arrangeRemainingPeople(3);
//   // console.log(cleaningSystem.result);
//   // cleaningSystem.arrangeRemainingPeople(2);
//   // console.log(cleaningSystem.result);
//   // cleaningSystem.arrangeRemainingPeople(1);
//   // console.log(cleaningSystem.result);
//   // return cleaningSystem.result;
// };

// class CleaningSystem {
//   constructor(organization) {
//     this.organization = organization;
//   }

//   // 휴가 혹은 근무 중인 인원을 청소 인원에서 제외한다.
//   exclude(people) {
//     console.log(people);
//   }

//   // id에 해당하는 청소구역의 남는 인원을 위쪽 청소구역에 배정한다.
//   arrangeRemainingPeople(id) {
//     const remainingPeople = this.getRemainingPeople(id);
//     this.removeRemainingArea(id);
//     this.arrange(id - 1, [...remainingPeople]);
//   }

//   // 현재 청소구역의 남는 인원을 구한다.
//   getRemainingPeople(id) {
//     const { cleaningAreaList } = this.organization.find((obj) => obj.id === id);
//     console.log(cleaningAreaList);
//     return cleaningAreaList
//       .map((obj) => {
//         const result = [];
//         while (obj.assignedPeople.length > obj.maximum) {
//           result.push(obj.assignedPeople.shift());
//         }
//         return result;
//       })
//       .flat();
//   }

//   removeRemainingArea(id) {
//     const obj = this.organization.find((obj) => obj.id === id);
//     obj.cleaningAreaList.forEach((cleaningArea) => {
//       while (cleaningArea.assignedPeople.length > cleaningArea.maximum) {
//         cleaningArea.assignedPeople.pop();
//       }
//     });

//     this.organization = [...this.organization.filter((obj) => obj.id !== id), obj];
//   }

//   arrange(id, remainingPeople) {
//     const obj = this.organization.find((obj) => obj.id === id);
//     // 최대 인원이 아닌 청소구역에 배치
//     obj.cleaningAreaList.forEach((cleaningArea) => {
//       if (remainingPeople.length > 0 && cleaningArea.assignedPeople.length < cleaningArea.maximum) {
//         const person = remainingPeople.shift();
//         cleaningArea.assignedPeople.push(person);
//       }
//     });
//     // 짬순 높은 사람이 있는 곳에 인원 배치
//     const generationAndAreaNameObj = obj.cleaningAreaList
//       .map((area) => area.assignedPeople.map((person) => ({ generation: person.generation, areaName: area.name })))
//       .flat();
//     generationAndAreaNameObj.sort((a, b) => a.generation - b.generation);

//     while (remainingPeople.length > 0) {
//       const person = remainingPeople.shift();
//       const { areaName } = generationAndAreaNameObj.shift();
//       generationAndAreaNameObj.push({ areaName });
//       const area = obj.cleaningAreaList.find((area) => area.name === areaName);
//       area.assignedPeople.push(person);
//     }

//     this.organization = [...this.organization.filter((obj) => obj.id !== id), obj];
//   }

//   get result() {
//     return this.organization;
//   }
// }

export const rearrange = (organization, absentPeople = [], remainingPeople = []) => {
  const cleaningSystem = new CleaningSystem(organization);
  cleaningSystem.exclude(absentPeople);
  cleaningSystem.add(remainingPeople);
  cleaningSystem.start();
  console.log(cleaningSystem.result);
  return cleaningSystem.result;
};

class CleaningSystem {
  constructor(organization) {
    this.organization = organization;
    this.remainingPeople = [];
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
  }

  // 피해복구반이 아닌 인원들을 청소인원에 추가
  add(people) {
    while (people.length > 0) {
      this.remainingPeople.push(people.shift());
    }
  }

  start() {
    for (let i = 3; i > 0; i--) {
      this.arrange(i);
    }

    const obj = this.organization.find((obj) => obj.id === 0);
    while (this.remainingPeople.length > 0) {
      obj.cleaningAreaList[0].assignedPeople.push(this.remainingPeople.shift());
    }

    for (let i = 3; i > 0; i--) {
      this.arrange(i);
    }
  }

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

  getCleaningAreaByPerson(cleaningAreaList, person) {
    const result = cleaningAreaList.find((area) =>
      area.assignedPeople.some((p) => p.name === person.name && p.generation === person.generation),
    );
    return result;
  }

  arrange(id) {
    const obj = this.organization.find((obj) => obj.id === id);
    // 청소구역 중 최대인원이 아닌 곳에 remainingPeople 배치
    let isChanged = true;
    const maxAreaLength = obj.cleaningAreaList.length;
    for (let i = 0; i < maxAreaLength; i++) {
      isChanged = false;
      if (obj.cleaningAreaList[i].maximum > obj.cleaningAreaList[i].assignedPeople.length) {
        obj.cleaningAreaList[i].assignedPeople.push(this.remainingPeople.shift());
        isChanged = true;
      }
    }

    // 짬순으로 한명씩 검사한 이후 remainingPeople에 있는 인원이 들어갈 수 있고, 짬이 낮으면 바꿈
    isChanged = true;
    while (isChanged) {
      isChanged = false;
      const highestPerson = this.getHighestPerson(obj.cleaningAreaList);
      const { name } = this.getCleaningAreaByPerson(obj.cleaningAreaList, highestPerson);
      const cleaingArea = obj.cleaningAreaList.find((area) => area.name === name);
      for (let i = 0; i < this.remainingPeople.length; i++) {
        if (highestPerson.generation < this.remainingPeople[i].generation) {
          console.log(highestPerson, cleaingArea, this.remainingPeople[i]);
          const temp = { ...this.remainingPeople[i] };
          this.remainingPeople[i] = { ...highestPerson };
          cleaingArea.assignedPeople = cleaingArea.assignedPeople.filter(
            (p) => !(p.name === highestPerson.name && p.generation === highestPerson.generation),
          );
          cleaingArea.assignedPeople.push(temp);
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
