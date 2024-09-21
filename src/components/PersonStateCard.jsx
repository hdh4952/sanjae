import { useState } from 'react';

const getColorByState = (state) => {
  if (state === 'work') {
    return 'tomato';
  }

  if (state === 'off') {
    return 'skyblue';
  }

  return '';
};

const PersonStateCard = ({ person }) => {
  const [bgColor, setBgColor] = useState(getColorByState(person.state));

  const setPersonState = (state) => {
    person.state = state;
    setBgColor(getColorByState(state));
  };

  return (
    <div
      key={person.generation + person.name}
      style={{
        display: 'flex',
        width: '80%',
        backgroundColor: bgColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px',
      }}
    >
      <div style={{ width: '40%' }}>{person.name}</div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button style={{ width: '48px' }} onClick={() => setPersonState('work')}>
          근무
        </button>
        <button style={{ width: '48px' }} onClick={() => setPersonState('off')}>
          휴가
        </button>
        <button style={{ width: '48px' }} onClick={() => setPersonState('on')}>
          일과
        </button>
      </div>
    </div>
  );
};

export default PersonStateCard;
