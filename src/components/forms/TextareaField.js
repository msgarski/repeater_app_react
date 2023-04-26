import { forwardRef } from "react";

const TextareaField = forwardRef(
  (
    {
      rows = 3,
      cols = 20,
      title = "",
      id = "",
      placeholder = "",
      type = "text",
      value = "",
      name = "",
      maxLength = 190,
      onChange,
      actionOnBlur,
    },
    myRef
  ) => {
    return (
      <>
        <div>
          <label htmlFor={id}>{title}</label>
          <textarea
            rows={rows}
            cols={cols}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
            maxLength={maxLength}
            ref={myRef}
          />
        </div>
      </>
    );
  }
);

export default TextareaField;
