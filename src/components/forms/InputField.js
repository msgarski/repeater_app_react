import { forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      title = "",
      id = "",
      placeholder = "",
      type = "text",
      value = "",
      name = "",
      onChange,
    },
    myRef
  ) => {
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
            ref={myRef}
          />
        </div>
      </>
    );
  }
);

export default InputField;
