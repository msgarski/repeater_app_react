const CustomButton = ({ type = "button", onClickAction, children }) => {
  return (
    <>
      <button type={type} onClick={onClickAction}>
        {children}
      </button>
    </>
  );
};

export default CustomButton;
