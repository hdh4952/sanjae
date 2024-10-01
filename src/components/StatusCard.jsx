import AddPersonForm from './AddPersonForm';
import RoomCard from './RoomCard';

const StatusCard = ({ rooms, addPerson }) => {
  return (
    <>
      <span>총원 {}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '95vw', padding: '8px' }}>
        {rooms.map((room) => {
          return <RoomCard key={room.name} name={room.name} people={room.people} />;
        })}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '80px',
          width: '95vw',
          boxSizing: 'border-box',
          marginTop: '32px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: 'large', paddingLeft: '32px' }}>인원 추가</div>
        <AddPersonForm addPerson={addPerson} />
      </div>
    </>
  );
};

export default StatusCard;
