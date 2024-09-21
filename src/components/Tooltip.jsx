const Tooltip = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '8px',
        height: '60px',
        width: '95vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'end',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>근무</div>
        <div style={{ height: '80%', width: '30px', backgroundColor: 'tomato' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>휴가</div>
        <div style={{ height: '80%', width: '30px', backgroundColor: 'skyblue' }} />
      </div>
    </div>
  );
};

export default Tooltip;
