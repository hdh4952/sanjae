const PersonCard = ({ person }) => {
  const { state } = person;
  const bgColor = (() => {
    if (state === 'off') {
      return 'skyblue';
    }
    if (state === 'work') {
      return 'tomato';
    }
    return '';
  })();

  return (
    <div style={{ backgroundColor: bgColor, marginBottom: '4px', padding: '4px' }}>
      {person.generation}기 {person.name}
    </div>
  );
};

export default PersonCard;
