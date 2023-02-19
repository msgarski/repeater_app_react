import InputField from "./InputField";
import { useState, useRef, useEffect } from "react";
import { INITIAL_PAIR_PASSWORD_STATE } from "../../general/constants";

const PasswordDoublefields = ({
  setPassIsValid,
  setNewPassword,
  submition,
}) => {
  const [newPasswordsState, setPasswordsState] = useState(
    INITIAL_PAIR_PASSWORD_STATE
  );
  const [typeOfInputField, setTypeOfInputField] = useState("password");
  const [passValidation, setPassValidation] = useState(false);
  const passRef = useRef();

  useEffect(() => {
    if (submition) {
      setPasswordsState(INITIAL_PAIR_PASSWORD_STATE);
    }
  }, [submition]);

  useEffect(() => {
    if (passValidation) {
      setPassIsValid(true);
      setNewPassword(newPasswordsState.password);
    }
  }, [
    passValidation,
    setPassIsValid,
    setNewPassword,
    newPasswordsState.password,
  ]);

  //************************************************************************** */
  // Validation rules
  //************************************************************************** */
  // useEffect(() => {
  //   let result = checkStringForSpecialChar(signUpPack.password);
  //   console.log("test hasła na special chars: ", result);
  // }, [signUpPack.password]);

  const isValid = () => {
    setPassValidation(true);
  };

  const showPass = () => {
    // console.log("uwidocznienie hasla: ", passRef.current.type);
    setTypeOfInputField(typeOfInputField ? "" : "password");
    // console.log("typ: ", typeOfInputField);
  };
  const handleInputFieldToHookObject = (event) => {
    setPasswordsState({
      ...newPasswordsState,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <div>Password section</div>
      <InputField
        ref={passRef}
        title="Hasło"
        type={typeOfInputField}
        name="password"
        id="password"
        value={newPasswordsState.password}
        onChange={handleInputFieldToHookObject}
      />
      <InputField
        title="Potwierdź hasło"
        type={typeOfInputField}
        name="password_confirmation"
        id="password_confirmation"
        value={newPasswordsState.password_confirmation}
        onChange={handleInputFieldToHookObject}
      />
      <button onClick={showPass} type="button">
        zobacz hasło
      </button>
      <button onClick={isValid} type="button">
        proba validacji
      </button>
    </>
  );
};

export default PasswordDoublefields;
