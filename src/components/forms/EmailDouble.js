import { useState, useEffect, forwardRef } from "react";
import {
  INITIAL_PAIR_EMAIL_STATE,
  INITIAL_EMAIL_VALIDATION_STATE,
} from "../../general/constants";
import {
  hasEmailProperStructure,
  identityChecking,
  isStringExists,
} from "../../general/validators";

//********************************************************************* */
// Function Component Section
//********************************************************************* */

const EmailDouble = forwardRef(({ setEmailIsValid, submition }, emailRef) => {
  const [newEmailsState, setEmailsState] = useState(INITIAL_PAIR_EMAIL_STATE);
  const [emailValidationState, setEmailValidationState] = useState(
    INITIAL_EMAIL_VALIDATION_STATE
  );

  const handleInputFieldToHookObject = (event) => {
    setEmailsState({
      ...newEmailsState,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    if (submition) {
      setEmailsState(INITIAL_PAIR_EMAIL_STATE);
    }
  }, [submition]);

  //**************************************************************************** */
  // Validation Rules Section
  //****************************************************************************** */
  // todo delete later
  const isValid = () => {
    setEmailValidationState(true);
  };
  useEffect(() => {
    setEmailValidationState({
      properLength: !!isStringExists(newEmailsState.email),
      properStructure: hasEmailProperStructure(newEmailsState.email),
      identity: identityChecking(
        newEmailsState.email,
        newEmailsState.email_confirmation
      ),
    });
  }, [newEmailsState]);

  useEffect(() => {
    let isEmailGeneralValid = Object.values(emailValidationState).every(
      (val) => val === true
    );
    console.log(
      "efekt walidacji emaila: ",
      emailValidationState,
      isEmailGeneralValid
    );
    if (isEmailGeneralValid) {
      setEmailIsValid(true);
    }
    if (!isEmailGeneralValid) {
      setEmailIsValid(false);
    }
  }, [emailValidationState, setEmailIsValid]);

  //************************************************************************** */
  // JSX code section
  //************************************************************************** */
  return (
    <>
      <div>
        <label htmlFor="email">Wpisz swój adres email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={newEmailsState.email}
          onChange={handleInputFieldToHookObject}
          ref={emailRef}
        />
      </div>

      <div>
        <label>Powtórz adres e-mail</label>
        <input
          type="text"
          name="email"
          id="email_confirmation"
          value={newEmailsState.email_confirmation}
          onChange={handleInputFieldToHookObject}
        />
      </div>
      <button onClick={isValid} type="button">
        proba validacji
      </button>
    </>
  );
});
export default EmailDouble;
