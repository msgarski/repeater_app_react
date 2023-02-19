import InputField from "./InputField";
import { useState, useEffect } from "react";
import { INITIAL_PAIR_EMAIL_STATE } from "../../general/constants";

const EmailDoubleSection = ({ setEmailIsValid }) => {
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
      // todo przekazac email do signup
    }
  }, [emailValidation, setEmailIsValid]);

  const isValid = () => {
    setEmailValidation(true);
  };

  return (
    <>
      <InputField
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

export default EmailDoubleSection;
