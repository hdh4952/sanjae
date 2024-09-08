import CleaningArea from './CleaningArea';

const CleaningBoard = ({ title, cleaningAreaList, setCleaningAreaList }) => {
  const removeCleaningArea = (name) => {
    const newCleaningArea = cleaningAreaList.filter((area) => area.name !== name);
    setCleaningAreaList(newCleaningArea);
  };

  return (
    <>
      <h2 style={{ display: 'flex', alignItems: 'center', width: '95vw', borderBottom: '2px solid black' }}>
        {title}
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '32px',
            width: '32px',
            borderRadius: '8px',
            border: 'none',
            padding: '4px',
            margin: '4px',
            boxSizing: 'border-box',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log(cleaningAreaList);
            // 청소구역 이름 및 담당자 이름 받아서 cleaningAreaList에 추가
            // use setCleaningAreaList
            setCleaningAreaList([
              ...cleaningAreaList,
              {
                name: Math.random(),
                assignedPeople: [{ name: Math.random(), generation: Math.random() }],
              },
            ]);
          }}
        >
          +
        </button>
      </h2>
      <div style={{ width: '95vw', flexWrap: 'wrap', display: 'flex' }}>
        {cleaningAreaList &&
          cleaningAreaList.map(({ name, assignedPeople }) => (
            <CleaningArea
              key={name}
              areaName={name}
              assignedPeople={assignedPeople}
              remove={() => removeCleaningArea(name)}
            />
          ))}
      </div>
    </>
  );
};

export default CleaningBoard;
