const CleaningArea = ({ areaName, assignedPeople, remove }) => {
  return (
    <div
      style={{
        width: '30vw',
        border: '2px solid black',
        borderRadius: '16px',
        marginRight: '4px',
        marginBottom: '4px',
        padding: '8px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      onClick={() => console.log(areaName, 'clicked')}
    >
      <button
        style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          height: '24px',
          width: '24px',
          background: 'tomato',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
        }}
        onClick={(e) => {
          e.preventDefault();
          remove();
        }}
      >
        x
      </button>
      <div style={{ fontWeight: 'bold', fontSize: 'medium', marginBottom: '4px', borderRadius: '9999px' }}>
        {areaName}
      </div>
      {assignedPeople.map(({ generation, name }) => (
        <div key={generation + name}>
          {generation}기 {name}
        </div>
      ))}
    </div>
  );
};

export default CleaningArea;
