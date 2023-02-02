const InfoModal = ({ message, action }) => {
  return (
    <>
      <div>{message}</div>
      <button onClick={action}>Wyjście</button>
    </>
  );
};

export default InfoModal;
