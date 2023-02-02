import { Link } from "react-router-dom";
import InputField from "../forms/InputField";
import { useState } from "react";
import { INITIAL_EMAIL_CONFIRMATION_STATE } from "../../general/constants";
import { validateEmail, identityChecking } from "../../general/validators";

const ForgotPassword = () => {
  const [userState, setUserState] = useState(true);
  const [messageState, setMessageState] = useState(false);
  const [emailsPack, setEmailsPack] = useState(
    INITIAL_EMAIL_CONFIRMATION_STATE
  );

  const handleChangeInputField = (event) => {
    setEmailsPack({
      ...emailsPack,
      [event.target.id]: event.target.value.trim().toLowerCase(),
    });
  };

  const sendForgottenPasswordForm = () => {
    // todo send email1 as valid address

    setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
  };
  //***************************************************************************** */
  //**************************************************************************** */
  const handleSubmitForm = (event) => {
    console.clear();
    event.preventDefault();

    if (!identityChecking(emailsPack.email1, emailsPack.email2)) {
      // emails are not equal!!!
      setEmailsPack({ ...INITIAL_EMAIL_CONFIRMATION_STATE, finished: true });
    } else if (!validateEmail(emailsPack.email1)) {
      // this string is not an email address!!
      console.log("this is not proper email address");
      setEmailsPack({ ...INITIAL_EMAIL_CONFIRMATION_STATE, finished: true });
    } else {
      console.log("seems to be ok");
      sendForgottenPasswordForm();
    }
  };
  //**************************************************************************************** */
  //**************************************************************************************** */
  return (
    <>
      <h1>Odnowienie hasła</h1>

      <p>
        Na adres email, podany podczas rejestracji, prześlemy link do
        zresetowania hasła
      </p>

      {/* gdy skutecznie wysłano email z linkiem do zresetowania hasła */}
      <div>
        {/* todo modal... */}
        {messageState ? (
          <p>
            email z linkiem do zresetowania Twojego hasła, został wysłany na
            podany adres
          </p>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {!userState ? (
          <p>Użytkownik o podanym adresie email, nie istnieje...</p>
        ) : (
          <p></p>
        )}
      </div>

      <div>
        {!(emailsPack.identity || emailsPack.correctness) &&
        emailsPack.finished ? (
          <p>Podany adres zawierał błąd, lub został źle powtórzony</p>
        ) : (
          <p></p>
        )}
      </div>
      <div>
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
