import TeamCard from './TeamCard';

const GroupCard = ({ group }) => {
  return (
    <>
      <h2 style={{ display: 'flex', alignItems: 'center', width: '95vw', borderBottom: '2px solid black' }}>
        {group.name}
      </h2>
      <div style={{ width: '95vw', flexWrap: 'wrap', display: 'flex' }}>
        {group.teams.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    </>
  );
};

export default GroupCard;
