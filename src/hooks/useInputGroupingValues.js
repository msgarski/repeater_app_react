/*
 *
 * Custom hook for receiving single input field value, reseting and updating it
 *
 */
import { useState } from "react";

const useInputGroupingValues = (initialState = null) => {
  const [value, setValue] = useState("");

  const handleUserInput = (event) => {
    setValue(event.target.value);
  };
  const resetInputValue = () => {
    setValue(initialState);
  };

  return {
    value,
    handleUserInput,
    resetInputValue,
  };
};

export default useInputGroupingValues;
