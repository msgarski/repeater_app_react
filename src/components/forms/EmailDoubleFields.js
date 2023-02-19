import InputField from "./InputField";
import { useState, useEffect, useRef } from "react";
import { INITIAL_PAIR_EMAIL_STATE } from "../../general/constants";

const EmailDoubleFields = ({ setEmailIsValid, setNewEmail, submition }) => {
  const [newEmailsState, setEmailsState] = useState(INITIAL_PAIR_EMAIL_STATE);
  const [emailValidation, setEmailValidation] = useState(false);
  const emailRef = useRef();

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

  return (
    <>
      <InputField
        ref={emailRef}
        title="Adres e-mail"
        type="email"
        name="email"
        id="email"
        value={newEmailsState.email}
        onChange={handleInputFieldToHookObject}
      />
      <InputField
        title="Powtórz adres e-mail"
        type="email"
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

export default EmailDoubleFields;
