import { useState } from 'react';

const CleaningArea = ({ areaName, assignedPeople, remove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  assignedPeople.sort((p1, p2) => {
    return p1.generation - p2.generation;
  });

  return (
    <>
      {isModalOpen && (
        <div
          style={{
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            height: '100vh',
            width: '100vw',
            top: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: '60vh',
              width: '80vw',
              backgroundColor: 'white',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'column',
                width: '60%',
              }}
            >
              {assignedPeople.map((p) => {
                return (
                  <div key={p.generation + p.name}>
                    {p.generation}기 {p.name}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '60%',
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                닫기
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          width: '30vw',
          // border: '2px solid black',
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
          console.log(areaName, assignedPeople, 'clicked');
        }}
      >
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            height: '24px',
            width: '24px',
            background: 'tomato',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
          }}
          onClick={(e) => {
            e.preventDefault();
            remove();
          }}
        >
          x
        </button>
        <div style={{ fontWeight: 'bold', fontSize: 'medium', marginBottom: '4px', borderRadius: '9999px' }}>
          {areaName}
        </div>
        {assignedPeople.map(({ generation, name }) => (
          <div key={generation + name}>
            {generation}기 {name}
          </div>
        ))}
      </div>
    </>
  );
};

export default CleaningArea;
