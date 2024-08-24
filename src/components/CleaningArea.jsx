const CleaningArea = ({ areaName, assignedPeople }) => {
  return (
    <div
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
    >
      <div style={{ fontWeight: 'bold', fontSize: 'large', marginBottom: '4px' }}>{areaName}</div>
      {assignedPeople.map((person) => (
        <div key={person.generation + person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default CleaningArea;
