import { useState, useEffect, forwardRef, useRef } from "react";
import EmailDoubleMessages from "./EmailDoubleMessages";
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
  const alreadyRendered = useRef(false);

  const handleInputFieldToHookObject = (event) => {
    setEmailsState({
      ...newEmailsState,
      [event.target.id]: event.target.value.trim().toLowerCase(),
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

  useEffect(() => {
    if (alreadyRendered.current) {
      // console.log("nonOmittedfirst: ", isStringExists(newEmailsState.email));
      setEmailValidationState({
        nonOmittedFirst: isStringExists(newEmailsState.email),
        nonOmittedSecond: isStringExists(newEmailsState.email_confirmation),
        properStructure: hasEmailProperStructure(newEmailsState.email),
        identity: identityChecking(
          newEmailsState.email,
          newEmailsState.email_confirmation
        ),
      });
    } else {
      alreadyRendered.current = true;
    }
  }, [newEmailsState]);

  useEffect(() => {
    let isEmailGeneralValid = Object.values(emailValidationState).every(
      (val) => val === true
    );
    // console.log("isEmailGeneralValid", isEmailGeneralValid);
    if (isEmailGeneralValid) {
      setEmailIsValid(true);
    }
    if (!isEmailGeneralValid) {
      setEmailIsValid(false);
    }
  }, [emailValidationState, setEmailIsValid]);

  const validateEmailField = (moveDirection) => {
    switch (moveDirection) {
      case "first":
        console.log("zejscie z pola first");
        setEmailValidationState({
          ...emailValidationState,
          properStructure: hasEmailProperStructure(newEmailsState.email),
          nonOmittedFirst: isStringExists(newEmailsState.email),
        });
        break;
      case "second":
        setEmailValidationState({
          ...emailValidationState,
          nonOmittedSecond: isStringExists(newEmailsState.email_confirmation),
          identity: identityChecking(
            newEmailsState.email,
            newEmailsState.email_confirmation
          ),
        });
        break;
      default:
        setEmailValidationState(INITIAL_EMAIL_VALIDATION_STATE);
    }
  };

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
          value={newEmailsState.email || ""}
          onChange={handleInputFieldToHookObject}
          onBlur={() => validateEmailField("first")}
          ref={emailRef}
        />
      </div>
      <EmailDoubleMessages
        emailValidationState={emailValidationState}
        fieldId="First"
      />

      <div>
        <label>Powtórz adres e-mail</label>
        <input
          type="text"
          name="email"
          id="email_confirmation"
          value={newEmailsState.email_confirmation}
          onChange={handleInputFieldToHookObject}
          onBlur={() => validateEmailField("second")}
        />
      </div>
      <EmailDoubleMessages
        emailValidationState={emailValidationState}
        fieldId="Second"
      />
    </>
  );
});
export default EmailDouble;
