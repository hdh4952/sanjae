import RoomCard from './RoomCard';

const StatusCard = ({ rooms, setRooms }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '95vw', padding: '8px' }}>
      {rooms.map((room) => {
        return <RoomCard key={room.name} name={room.name} people={room.people} />;
      })}
    </div>
  );
};

export default StatusCard;
