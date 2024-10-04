const Modal = ({ children, closeModal }) => {
  return (
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
            height: '80%',
            overflowY: 'scroll',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flexDirection: 'column',
            width: '90%',
          }}
        >
          {children}
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
