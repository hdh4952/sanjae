import { useState } from 'react';
import './App.css';
import CleaningBoard from './components/CleaningBoard';
import { baseArea } from './data/base';
import { rearrange } from './core/rearrange';

function App() {
  const [organization, setOrganization] = useState(baseArea);

  organization.sort((a, b) => a.id - b.id);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      {organization &&
        organization.map(({ id, title, cleaningAreaList }) => (
          <CleaningBoard
            key={id}
            title={title}
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
          marginTop: '24px',
          backgroundColor: 'tomato',
          border: '3px solid tomato',
          borderRadius: '16px',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => {
          const newOrganization = rearrange(
            organization,
            [
              { name: '김민석', generation: 850 },
              { name: '주현욱', generation: 856 },
            ],
            [
              { name: '이승환', generation: 858 },
              { name: '박병언', generation: 859 },
              { name: '박준영', generation: 858 },
              { name: '박정욱', generation: 859 },
              { name: '손현민', generation: 859 },
              { name: '김서진', generation: 859 },
            ],
          );
          setOrganization(() => newOrganization);
        }}
      >
        제출
      </button>
    </div>
  );
}

export default App;
