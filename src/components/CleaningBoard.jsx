import CleaningArea from './CleaningArea';

const CleaningBoard = ({ title, cleaningAreaList }) => {
  return (
    <>
      <h2 style={{ width: '95vw', borderBottom: '2px solid black' }}>{title}</h2>
      <div style={{ width: '95vw', flexWrap: 'wrap', display: 'flex' }}>
        {cleaningAreaList &&
          cleaningAreaList.map((cleaningArea) => (
            <CleaningArea
              key={cleaningArea.name}
              areaName={cleaningArea.name}
              assignedPeople={cleaningArea.assignedPeople}
            />
          ))}
        <button
          style={{
            // height: '30vw',
            width: '30vw',
            border: '2px solid black',
            borderRadius: '16px',
            marginRight: '4px',
            marginBottom: '4px',
            padding: '8px',
            boxSizing: 'border-box',
          }}
          onClick={() => {
            // 청소구역 이름 및 담당자 이름 받아서 cleaningAreaList에 추가
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CleaningBoard;
