import './App.css';
import CleaningBoard from './components/CleaningBoard';

function App() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingLeft: '8px', paddingRight: '8px' }}
    >
      <CleaningBoard
        title={'생활관'}
        cleaningAreaList={[
          { name: '1내', assignedPeople: [{ name: '청소1', generation: 857 }] },
          { name: '2내', assignedPeople: [{ name: '청소2', generation: 857 }] },
          { name: '3내', assignedPeople: [{ name: '청소3', generation: 857 }] },
          { name: '4내', assignedPeople: [{ name: '청소4', generation: 857 }] },
          { name: '5내', assignedPeople: [{ name: '청소5', generation: 857 }] },
          { name: '7내', assignedPeople: [{ name: '청소6', generation: 857 }] },
        ]}
      />
      <CleaningBoard
        title={'공공실'}
        cleaningAreaList={[
          {
            name: '공공실 A',
            assignedPeople: [
              { name: '청소7', generation: 857 },
              { name: '청소8', generation: 857 },
            ],
          },
          {
            name: '공공실 B',
            assignedPeople: [
              { name: '청소9', generation: 857 },
              { name: '청소10', generation: 857 },
            ],
          },
          {
            name: '생활관 주변',
            assignedPeople: [{ name: '청소11', generation: 857 }],
          },
        ]}
      />
      <CleaningBoard
        title={'기타'}
        cleaningAreaList={[
          {
            name: '복도',
            assignedPeople: [
              { name: '청소12', generation: 857 },
              { name: '청소13', generation: 857 },
              { name: '청소14', generation: 857 },
              { name: '청소15', generation: 857 },
            ],
          },
          {
            name: '1층 화장실',
            assignedPeople: [
              { name: '청소16', generation: 857 },
              { name: '청소17', generation: 857 },
              { name: '청소18', generation: 857 },
              { name: '청소19', generation: 857 },
            ],
          },
          {
            name: '2층 화장실',
            assignedPeople: [
              { name: '청소20', generation: 857 },
              { name: '청소21', generation: 857 },
              { name: '청소22', generation: 857 },
              { name: '청소23', generation: 857 },
            ],
          },
          {
            name: '세면장',
            assignedPeople: [
              { name: '청소24', generation: 857 },
              { name: '청소25', generation: 857 },
              { name: '청소26', generation: 857 },
              { name: '청소27', generation: 857 },
            ],
          },
        ]}
      />
    </div>
  );
}

export default App;
