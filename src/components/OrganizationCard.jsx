import { ArrangeSystem } from '../core/ArrangeSystem';
import GroupCard from './GroupCard';

const submitBtnStyle = {
  height: '48px',
  width: '95vw',
  padding: '16px',
  marginTop: '24px',
  backgroundColor: 'tomato',
  border: '3px solid tomato',
  borderRadius: '16px',
  color: 'white',
  fontWeight: 'bold',
};

const OrganizationCard = ({ organ, setOrgan, rooms }) => {
  return (
    <div
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      {organ.groups.map((group) => (
        <GroupCard key={group.name} group={group} />
      ))}
      <button
        style={submitBtnStyle}
        onClick={() => {
          const arrangeSystem = new ArrangeSystem(organ, rooms);
          arrangeSystem.start();
          setOrgan(() => arrangeSystem.result);
        }}
      >
        제출
      </button>
    </div>
  );
};

export default OrganizationCard;
