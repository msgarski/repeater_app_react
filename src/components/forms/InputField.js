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
      maxLength = 49,
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
              maxLength={maxLength}
              ref={myRef}
            />
          )}
        </div>
      </>
    );
  }
);

export default InputField;
