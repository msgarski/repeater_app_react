const NameMessage = ({ exists, properLength }) => {
  const key = `${exists}-${properLength}`;
  return (
    <>
      <div>
        {
          {
            "false-false": <p>Pole wymagane</p>,
            "true-false": <p>Wymagane są co najmniej 3 znaki</p>,
            "true-true": <p>OK</p>,
          }[key]
        }
      </div>
    </>
  );
};

export default NameMessage;
