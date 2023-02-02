import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../general/constants";
import InputField from "../forms/InputField";
import { INITIAL_EMAIL_CONFIRMATION_STATE } from "../../general/constants";
import { validateEmail, identityChecking } from "../../general/validators";
import InfoModal from "../modals/InfoModal";

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
  //******************************************************************************** */
  //  sending http request method
  //******************************************************************************** */
  const sendForgottenPasswordForm = async () => {
    try {
      const response = await axios.post(API_URL + "/password/checking", {
        email: emailsPack.email1,
      });
      console.clear();
      console.log(response.data);
      setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
      if (response.status === 200) setMessageState(true);
      setUserState(true);
      console.log("response :>> ", response.data);
    } catch (err) {
      // todo depend on error type, set user or message state to false
      console.log("error: ", err);
    }
  };
  //***************************************************************************** */
  //  submitting form method
  //**************************************************************************** */
  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (!identityChecking(emailsPack.email1, emailsPack.email2)) {
      setEmailsPack({ ...INITIAL_EMAIL_CONFIRMATION_STATE, finished: true });
    } else if (!validateEmail(emailsPack.email1)) {
      setEmailsPack({ ...INITIAL_EMAIL_CONFIRMATION_STATE, finished: true });
    } else {
      sendForgottenPasswordForm();
    }
  };
  //**************************************************************************************** */
  //  JSX code
  //**************************************************************************************** */
  return (
    <>
      <h1>Odnowienie hasła</h1>
      <p>
        Na adres email, podany podczas rejestracji, prześlemy link do
        zresetowania hasła
      </p>

      <div>
        {messageState ? (
          <InfoModal
            message="email z linkiem do zresetowania Twojego hasła, został wysłany na
            podany adres"
          />
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {!userState ? (
          <InfoModal message="Użytkownik o podanym adresie email, nie istnieje..." />
        ) : (
          <p></p>
        )}
      </div>

      <div>
        {!(emailsPack.identity || emailsPack.correctness) &&
        emailsPack.finished ? (
          <InfoModal message="Podany adres zawierał błąd, lub został źle powtórzony" />
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
