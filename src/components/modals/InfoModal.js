const InfoModal = ({ message, action, children }) => {
  // todo zrobic krzyzyk kasowania modala
  return (
    <>
      <div>{message}</div>
      <button onClick={action}>{children}</button>
    </>
  );
};

export default InfoModal;
