const InfoModal = ({ message, action, children = "Kliknij" }) => {
  // todo zrobic krzyzyk kasowania modala
  return (
    <>
      <div>{message}</div>
      <button onClick={action}>{children}</button>
    </>
  );
};

export default InfoModal;
