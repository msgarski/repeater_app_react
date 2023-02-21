import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import { useState } from "react";
import axios from "axios";
import InputField from "../forms/InputField";
import {
  INITIAL_EMAIL_CONFIRMATION_STATE,
  API_URL,
} from "../../general/constants";
import { validateEmail, identityChecking } from "../../general/validators";
import InfoModal from "../modals/InfoModal";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(true);
  const [messageState, setMessageState] = useState(false);
  const [emailsPack, setEmailsPack] = useState(
    INITIAL_EMAIL_CONFIRMATION_STATE
  );

  const handleEmailAddressInputField = (event) => {
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
      console.log("oto nasza odpowiedz: ", response.data);
      setEmailsPack(INITIAL_EMAIL_CONFIRMATION_STATE);
      if (response.status === 200) setMessageState(true);
      setUserState(true);
      console.log("response :>> ", response.data);
    } catch (err) {
      // todo depend on error type, set user or message state to false
      if (err.response.status === 404) {
        setUserState(false);
      }
      console.log("error: ", err.response.status);
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
  const turnBack = () => navigate("/");
  // const closeModal = () => {};
  //**************************************************************************************** */
  //  JSX code
  //**************************************************************************************** */
  return (
    <>
      <section>
        <header>
          <h1>Odnowienie hasła</h1>
        </header>
        <p>
          Na podany poniżej adres email, prześlemy link do zresetowania hasła
        </p>
      </section>

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
          <InfoModal message="Użytkownik o podanym adresie email, nie istnieje...">
            Wyjście
          </InfoModal>
        ) : (
          <p></p>
        )}
      </div>

      <div>
        {(!emailsPack.identity || !emailsPack.correctness) &&
        emailsPack.finished ? (
          <InfoModal message="Podany adres zawierał błąd, lub został źle powtórzony">
            Wróć
          </InfoModal>
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
              onChange={handleEmailAddressInputField}
            />
          </div>
          <div>
            <InputField
              title="Powtórz adres e-mail"
              id="email2"
              type="text"
              name="email"
              value={emailsPack.email2}
              onChange={handleEmailAddressInputField}
            />
          </div>
          <CustomButton type="submit">Wyślij</CustomButton>
        </form>
      </div>

      <div>
        <CustomButton onClickAction={turnBack}>Wyjście</CustomButton>
      </div>
    </>
  );
};

export default ForgotPassword;
