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

  return (
    <div style={appStyle}>
      <Tooltip page={page} setPage={setPage} />
      {page === 0 && <OrganizationCard organ={organ} setOrgan={setOrgan} rooms={rooms} />}
      {page === 1 && <StatusCard rooms={rooms} setRoom={setRooms} />}
    </div>
  );
};

export default RefactApp;
