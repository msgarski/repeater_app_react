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
      actionOnBlur,
    },
    myRef
  ) => {
    return (
      <>
        <div>
          <label htmlFor={id}>{title}</label>
          {type === "checkbox" ? (
            <input
              type="checkbox"
              onChange={onChange}
              id={id}
              name={name}
              checked={value}
              ref={myRef}
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              id={id}
              name={name}
              value={value}
              ref={myRef}
            />
          )}
        </div>
      </>
    );
  }
);

export default InputField;
