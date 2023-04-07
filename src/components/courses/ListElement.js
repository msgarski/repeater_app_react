const ListElement = ({
  name,
  description,
  forLearning,
  repeats,
  cards,
  lessons,
}) => {
  return (
    <>
      <p>
        {name} opis: {description} lekcji: {lessons} kart: {cards} do nauki:{" "}
        {forLearning} powtórki: {repeats}
      </p>
    </>
  );
};

export default ListElement;
