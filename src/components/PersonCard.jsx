const PersonCard = ({ person }) => {
  return (
    <div>
      {person.generation}기 {person.name}
    </div>
  );
};

export default PersonCard;
