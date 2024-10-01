const RoomCard = ({ name, people }) => {
  return (
    <div
      style={{
        width: '30vw',
        borderRadius: '16px',
        marginRight: '4px',
        marginBottom: '4px',
        padding: '8px',
        boxSizing: 'border-box',
        position: 'relative',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: 'medium', marginBottom: '8px' }}>{name}</div>

      {people.map((person) => (
        <div key={person.generation + person.name}>
          {person.generation}기 {person.name}
        </div>
      ))}
    </div>
  );
};

export default RoomCard;
