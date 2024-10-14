import AddPersonForm from './AddPersonForm';
import RemovePersonForm from './RemovePersonForm';
import RoomCard from './RoomCard';

const StatusCard = ({ rooms, addPerson, removePerson }) => {
  return (
    <>
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
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 'large', paddingLeft: '32px' }}>인원 추가</div>
          <AddPersonForm addPerson={addPerson} />
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 'large', paddingLeft: '32px' }}>인원 삭제</div>
          <RemovePersonForm removePerson={removePerson} />
        </div>
      </div>
    </>
  );
};

export default StatusCard;
