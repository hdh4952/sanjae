import { useState } from 'react';
import './App.css';
import CleaningBoard from './components/CleaningBoard';
import { baseArea } from './data/base';
import { rearrange } from './core/rearrange';

function App() {
  const [organization, setOrganization] = useState(baseArea);
  const [absentPeople, setAbsentPeople] = useState([]);

  const addOnWork = (person) => {
    const found = absentPeople.find((p) => p.name === person.name && p.generation === person.generation);
    if (found) {
      removeOnAbsent(person);
    }
    setAbsentPeople((prev) => [...prev, { ...person, state: 'work' }]);
  };

  const addOnVacation = (person) => {
    const found = absentPeople.find((p) => p.name === person.name && p.generation === person.generation);
    if (found) {
      removeOnAbsent(person);
    }
    setAbsentPeople((prev) => [...prev, { ...person, state: 'vacation' }]);
  };

  const removeOnAbsent = (person) => {
    setAbsentPeople((prev) => prev.filter((e) => !(e.name === person.name && e.generation === person.generation)));
  };

  organization.sort((a, b) => a.id - b.id);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        paddingLeft: '8px',
        paddingRight: '8px',
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: '8px',
          height: '60px',
          width: '95vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'end',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>근무</div>
          <div style={{ height: '80%', width: '30px', backgroundColor: 'tomato' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>휴가</div>
          <div style={{ height: '80%', width: '30px', backgroundColor: 'skyblue' }} />
        </div>
      </div>
      {organization &&
        organization.map(({ id, title, cleaningAreaList }) => (
          <CleaningBoard
            key={id}
            title={title}
            stateFn={{ addOnWork, addOnVacation, removeOnAbsent }}
            absentPeople={absentPeople}
            cleaningAreaList={cleaningAreaList}
            setCleaningAreaList={(newCleaningAreaList) => {
              const restOrganization = organization.filter((obj) => obj.title !== title);
              const newOrganization = [{ id, title, cleaningAreaList: newCleaningAreaList }, ...restOrganization].sort(
                (a, b) => a.id - b.id,
              );
              setOrganization(() => newOrganization);
            }}
          />
        ))}
      <button
        style={{
          height: '48px',
          width: '95vw',
          padding: '16px',
          marginBottom: '84px',
          marginTop: '24px',
          backgroundColor: 'tomato',
          border: '3px solid tomato',
          borderRadius: '16px',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => {
          const newOrganization = rearrange(organization, absentPeople);
          setOrganization(() => newOrganization);
        }}
      >
        제출
      </button>
    </div>
  );
}

export default App;
