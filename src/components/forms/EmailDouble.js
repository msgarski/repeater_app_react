import { useState, useEffect } from "react";
import { INITIAL_PAIR_EMAIL_STATE } from "../../general/constants";

const EmailDouble = ({ setEmailIsValid, setNewEmail, submition }) => {
  const [newEmailsState, setEmailsState] = useState(INITIAL_PAIR_EMAIL_STATE);
  const [emailValidation, setEmailValidation] = useState(false);

  const handleInputFieldToHookObject = (event) => {
    setEmailsState({
      ...newEmailsState,
      [event.target.id]: event.target.value,
    });
  };
  useEffect(() => {
    if (emailValidation) {
      setEmailIsValid(true);
      setNewEmail(newEmailsState.email);
    }
  }, [emailValidation, setEmailIsValid, setNewEmail, newEmailsState.email]);

  useEffect(() => {
    if (submition) {
      setEmailsState(INITIAL_PAIR_EMAIL_STATE);
    }
  }, [submition]);

  const isValid = () => {
    setEmailValidation(true);
  };

  // useEffect(() => {
  //   if (emailValidationState) {
  //     // send these to parent
  //     setEmailIsValid(true);
  //   }
  // }, [emailValidationState, setEmailIsValid]);

  return (
    <>
      <input
        type="text"
        name="email"
        id="email"
        value={newEmailsState.email}
        onChange={handleInputFieldToHookObject}
      />
      <label>Powtórz adres e-mail</label>
      <input
        type="text"
        name="email"
        id="email_confirmation"
        value={newEmailsState.email_confirmation}
        onChange={handleInputFieldToHookObject}
      />
      <button onClick={isValid} type="button">
        proba validacji
      </button>
    </>
  );
};

export default EmailDouble;
