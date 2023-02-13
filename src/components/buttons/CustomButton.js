const CustomButton = ({
  type = "button",
  text = "przycisk",
  onClickAction,
}) => {
  return (
    <>
      <button type={type} onClick={onClickAction}>
        {text}
      </button>
    </>
  );
};

export default CustomButton;
