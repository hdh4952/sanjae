import { useState } from 'react';
import './App.css';
import organization from './core/defaultOrganization';
import Tooltip from './components/Tooltip';
import statusOfPersonnel from './core/defaultStatusOfPersonnel';
import OrganizationCard from './components/OrganizationCard';
import StatusCard from './components/StatusCard';

const appStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  overflowY: 'scroll',
  paddingTop: '80px',
};

const RefactApp = () => {
  const [organ, setOrgan] = useState(organization);
  const [rooms, setRooms] = useState(statusOfPersonnel);
  const [page, setPage] = useState(0);

  const addPerson = (person) => {
    setOrgan((prev) => {
      const group = prev.groups.find((group) => group.grade === 4);
      group.teams[0].insertPerson(person);
      return prev;
    });

    setRooms((prev) => {
      const room = prev.find((room) => room.name === '6 생활관');
      room.insertPerson(person);
      return [...prev];
    });
  };

  const removePerson = (person) => {
    setOrgan((prev) => {
      prev.groups.forEach((group) => {
        group.teams.forEach((team) => {
          team.removePerson(person);
        });
      });

      return prev;
    });

    setRooms((prev) => {
      const room = prev.find((room) => room.isLiving(person));
      room.removePerson(person);
      return [...prev];
    });
  };

  return (
    <div style={appStyle}>
      <Tooltip page={page} setPage={setPage} />
      {page === 0 && <OrganizationCard organ={organ} setOrgan={setOrgan} rooms={rooms} />}
      {page === 1 && <StatusCard rooms={rooms} setRoom={setRooms} addPerson={addPerson} removePerson={removePerson} />}
    </div>
  );
};

export default RefactApp;
