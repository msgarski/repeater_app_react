import { Link } from "react-router-dom";
import InputField from "../forms/InputField";
import { useState } from "react";
import { INITIAL_EMAIL_CONFIRMATION_STATE } from "../../general/constants";
import { validateEmail, identityChecking } from "../../general/validators";

const ForgotPassword = () => {
  const [emailsPack, setEmailsPack] = useState(
    INITIAL_EMAIL_CONFIRMATION_STATE
  );

  const handleChangeInputField = (event) => {
    setEmailsPack({
      ...emailsPack,
      [event.target.id]: event.target.value,
    });
  };

  const sendForgottenPasswordForm = () => {
    // todo send email1 as valid address

    setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    setEmailsPack({
      email1: emailsPack.email1.trim().toLowerCase(),
      email2: emailsPack.email2.trim().toLowerCase(),
    });
    //todo usereducer for below options needed:
    if (!identityChecking(emailsPack.email1, emailsPack.email2)) {
      // emails are not equal!!!
      console.log("emails are not equal each other");
      setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
    }
    if (!validateEmail(emailsPack.email1)) {
      // string is not an email
      console.log("this is not proper email address");
      setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
    }

    sendForgottenPasswordForm();
  };

  return (
    <>
      <h1>Odnowienie hasła</h1>
      {/* gdy skutecznie wysłano email z linkiem do zresetowania hasła */}
      <div>
        <p>
          email z linkiem do zresetowania Twojego hasła, został wysłany na adres
          podany przy rejestracji
        </p>
      </div>
      {/* jeśli user nie został znaleziony */}
      <div>
        <p>Użytkownik o podanym adresie email, nie istnieje...</p>
      </div>

      <div>
        <p>
          Na podany przez Ciebie poniżej adres, prześlemy link do formularza
          resetowania hasła
        </p>
        <form onSubmit={handleSubmitForm}>
          <div>
            <InputField
              title="Adres e-mail"
              id="email1"
              type="text"
              name="email"
              value={emailsPack.email1}
              onChange={handleChangeInputField}
            />
          </div>
          <div>
            <InputField
              title="Powtórz adres e-mail"
              id="email2"
              type="text"
              name="email"
              value={emailsPack.email2}
              onChange={handleChangeInputField}
            />
          </div>

          <button>Wyślij</button>
        </form>
      </div>

      <div>
        <Link to="/">
          <button>Wyjście</button>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
