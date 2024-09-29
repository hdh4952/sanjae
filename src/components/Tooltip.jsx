const tootipStyle = {
  zIndex: 9999,
  position: 'fixed',
  top: '0',
  height: '64px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  background: 'white',
  padding: '8px',
  boxSizing: 'border-box',
};

const Tooltip = ({ page, setPage }) => {
  return (
    <div style={tootipStyle}>
      <div style={{ width: '70%', display: 'flex', justifyContent: 'space-around' }}>
        <button
          style={{
            width: '40%',
            border: '1px solid lightgray',
            borderRadius: '8px',
            background: page === 0 ? 'lightgray' : 'white',
            color: 'black',
          }}
          type="button"
          onClick={() => setPage(0)}
        >
          청소현황
        </button>
        <button
          style={{
            width: '40%',
            border: '1px solid lightgray',
            borderRadius: '8px',
            background: page === 1 ? 'lightgray' : 'white',
            color: 'black',
          }}
          type="button"
          onClick={() => setPage(1)}
        >
          인원현황
        </button>
      </div>
      <div
        style={{
          height: '60px',
          width: '60px',
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
    </div>
  );
};

export default Tooltip;
