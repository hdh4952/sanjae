import { useState } from 'react';
import PersonCard from './PersonCard';
import Modal from './Modal';
import PersonStateCard from './PersonStateCard';

const TeamCard = ({ team }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <h3>
            <span>{team.name}</span>
          </h3>
          {team.people.map((person) => (
            <PersonStateCard key={person.generation + person.name} person={person} />
          ))}
        </Modal>
      )}
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
          openModal();
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: 'medium', marginBottom: '8px', borderRadius: '9999px' }}>
          {team.name}
        </div>
        {team.people
          .sort((a, b) => b.compareTo(a))
          .map((person) => (
            <PersonCard key={person.generation + person.name} person={person} />
          ))}
      </div>
    </>
  );
};

export default TeamCard;
