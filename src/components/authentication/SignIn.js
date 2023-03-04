import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, INITIAL_CREDENTIALS_STATE } from "../../general/constants";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import InputField from "../forms/InputField";
import InfoModal from "../modals/InfoModal";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    token,
    userId,
    setTokenContext,
    setUserIdContext,
    setUserNameContext,
  } = useAuthentication();

  console.log("token i id z signin: ", token, userId);

  const [credentialsPack, setCredentialsPack] = useState(
    INITIAL_CREDENTIALS_STATE
  );
  const [errorType, setErrorCode] = useState();

  const clearErrors = () => {
    setErrorCode(null);
  };

  // todo because the same method exists in ForgotPassword component

  const handleInputFieldToHookObject = (event) => {
    setCredentialsPack({
      ...credentialsPack,
      [event.target.id]: event.target.value,
    });
  };

  //****************************************************************************** */
  // http request method
  //****************************************************************************** */
  const sendCredentials = async () => {
    try {
      console.log("credentialsPack", credentialsPack);
      const response = await axios.post(
        API_URL + "/login/entering",
        credentialsPack
      );
      setTokenContext(response.data.token);
      setUserIdContext(response.data.userId);
      setUserNameContext(response.data.userName);
      navigate("/porch");
    } catch (error) {
      console.log("err", error);
      if (error.response.status) {
        setErrorCode(error.response.status);
      }
    }
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();
    sendCredentials();
    setCredentialsPack(INITIAL_CREDENTIALS_STATE);
  };

  //**************************************************************************************** */
  // JSX code
  //**************************************************************************************** */
  return (
    <>
      <h1 id="title">Logowanie</h1>
      <div>
        {
          {
            401: (
              <InfoModal
                message="Jeśli nie pamiętasz hasła, skorzystaj z opcji jego odzyskiwania"
                action={clearErrors}
              />
            ),
            403: (
              <InfoModal
                message="Konto nie zostało aktywowane, sprawdź swoją skrzynkę pocztową"
                action={clearErrors}
              />
            ),
            404: (
              <InfoModal
                message="Użytkownik o podanym adresie email, nie istnieje"
                action={clearErrors}
              />
            ),
          }[errorType]
        }
      </div>

      <div>
        <form onSubmit={handleSubmitEvent}>
          <InputField
            title="Login (e-mail)"
            id="email"
            type="email"
            name="email"
            value={credentialsPack.email}
            onChange={handleInputFieldToHookObject}
          />

          <InputField
            title="Hasło"
            id="password"
            type="password"
            name="password"
            value={credentialsPack.password}
            onChange={handleInputFieldToHookObject}
          />
          <p>msgarski@gmail.com</p>
          <button type="submit">Zatwierdź</button>
        </form>
      </div>
      <div>
        <div>
          <Link to="/">
            <button>Cofnij</button>
          </Link>
        </div>

        <div>
          <Link to="/forgot">
            <button>Odzyskiwanie konta</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
