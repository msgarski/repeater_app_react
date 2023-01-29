/*
 *
 * Custom hook for receiving user input value and updating it
 *
 */

import { useState } from "react";

const useGetAction = () => {
  const [value, setValue] = useState("");

  const handleUserInput = (event) => {
    setValue(event.target.value);
  };
  // todo a moze tu zrobic clear pola input?
  const handleClick = () => {
    setValue("");
  };

  return {
    value,
    handleUserInput,
    handleClick,
  };
};

export default useGetAction;
