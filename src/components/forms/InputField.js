const InputField = ({
  title = "",
  id = "",
  placeholder = "",
  type = "text",
  value = "",
  name = "",
  onChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor={id}>{title}</label>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          id={id}
          name={name}
          value={value}
        />
      </div>
    </>
  );
};

export default InputField;
