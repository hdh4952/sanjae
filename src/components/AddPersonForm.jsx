import { useState } from 'react';
import { Person } from '../models/Person';

const AddPersonForm = ({ addPerson }) => {
  const [generation, setGeneration] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const person = createPerson(generation, name);
      if (person) {
        addPerson(person);
        setGeneration('');
        setName('');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const createPerson = (generation, name) => {
    if (!generation || !name) {
      throw new Error('기수와 이름은 필수 입력값입니다.');
    }
    if (Object.is(NaN, Number.parseInt(generation))) {
      throw new Error('정상적인 기수가 아닙니다.');
    }

    return new Person(Number.parseInt(generation), name.trim());
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        heigth: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <label style={{ display: 'flex', width: '80%' }}>
          <span style={{ marginRight: '8px' }}>기수</span>
          <input style={{ width: '80%' }} value={generation} onChange={(e) => setGeneration(e.target.value)} />
        </label>
        <label style={{ display: 'flex', width: '80%' }}>
          <span style={{ marginRight: '8px' }}>이름</span>
          <input style={{ width: '80%' }} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <button style={{ height: '100%', width: '64px' }} type="submit">
        추가
      </button>
    </form>
  );
};

export default AddPersonForm;
