import PersonCard from './PersonCard';

const TeamCard = ({ team }) => {
  return (
    <>
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
        onClick={() => {
          console.log('clicked');
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: 'medium', marginBottom: '8px', borderRadius: '9999px' }}>
          {team.name}
        </div>
        {team.people.map((person) => (
          <PersonCard key={person.generation + person.name} person={person} />
        ))}
      </div>
    </>
  );
};

export default TeamCard;
