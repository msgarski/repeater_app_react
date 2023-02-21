import { useState, useEffect, forwardRef } from "react";
import {
  INITIAL_PAIR_PASSWORD_STATE,
  INITIAL_PASSWORD_VALIDATION_STATE,
  SPECIAL_CHARS_ALLOWED_IN_PASSWORD,
} from "../../general/constants";
import {
  isNumberInString,
  identityChecking,
  checkStringForSpecialChar,
  checkPasswordLength,
} from "../../general/validators";

//***************************************************************************** */
// Function Component
//****************************************************************************** */

const PasswordDouble = forwardRef(({ setPassIsValid, submition }, passRef) => {
  const [newPasswordsState, setPasswordsState] = useState(
    INITIAL_PAIR_PASSWORD_STATE
  );
  const [passValidationState, setPassValidationState] = useState(
    INITIAL_PASSWORD_VALIDATION_STATE
  );
  const [typeOfInputField, setTypeOfInputField] = useState("password");

  useEffect(() => {
    if (submition) {
      setPasswordsState(INITIAL_PAIR_PASSWORD_STATE);
    }
  }, [submition]);

  const showPass = () => {
    setTypeOfInputField(typeOfInputField ? "" : "password");
  };

  const handleInputFieldToHookObject = (event) => {
    setPasswordsState({
      ...newPasswordsState,
      [event.target.id]: event.target.value,
    });
  };

  //************************************************************************** */
  // Validation section
  //************************************************************************** */

  useEffect(() => {
    // check all validation rules:
    setPassValidationState({
      properLength: checkPasswordLength(newPasswordsState.password),
      specCharExists: checkStringForSpecialChar(newPasswordsState.password),
      numberExists: isNumberInString(newPasswordsState.password),
      identity: identityChecking(
        newPasswordsState.password,
        newPasswordsState.password_confirmation
      ),
    });
  }, [newPasswordsState]);

  // sending general password validation state to parent component
  useEffect(() => {
    let isPasswordGeneralValid = Object.values(passValidationState).every(
      (val) => val === true
    );
    if (isPasswordGeneralValid) {
      setPassIsValid(true);
    }
    if (!isPasswordGeneralValid) {
      setPassIsValid(false);
    }
  }, [passValidationState, setPassIsValid]);

  //************************************************************************ */
  // JSX code
  //************************************************************************** */
  return (
    <>
      <div>Password section</div>
      <div>
        <label htmlFor="password">Podaj hasło</label>
        <input
          ref={passRef}
          title="Hasło"
          type={typeOfInputField}
          name="password"
          id="password"
          value={newPasswordsState.password}
          onChange={handleInputFieldToHookObject}
        />
        <button onClick={showPass} type="button">
          zobacz hasło
        </button>
      </div>
      <div>
        <label htmlFor="password_confirmation">Powtórz hasło</label>
        <input
          title="Potwierdź hasło"
          type={typeOfInputField}
          name="password_confirmation"
          id="password_confirmation"
          value={newPasswordsState.password_confirmation}
          onChange={handleInputFieldToHookObject}
        />
      </div>

      <section>
        <div>
          <p>długość hasła - od 5 do 15 znaków</p>
          {passValidationState.properLength ? <h1>V</h1> : null}{" "}
        </div>
        <div>
          <p>
            obecność minimum jednego znaku specjalnego:{" "}
            {SPECIAL_CHARS_ALLOWED_IN_PASSWORD}
          </p>
          {passValidationState.specCharExists ? <h1>V</h1> : null}
        </div>
        <div>
          <p>obecność minimum jednej cyfry</p>
          {passValidationState.numberExists ? <h1>V</h1> : null}{" "}
        </div>
        <div>
          <p>zgodność obu haseł</p>
          {passValidationState.identity ? <h1>V</h1> : null}{" "}
        </div>
      </section>
    </>
  );
});

export default PasswordDouble;
