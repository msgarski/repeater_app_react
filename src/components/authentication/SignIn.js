import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../general/constants";
import { INITIAL_CREDENTIALS_STATE } from "../../general/constants";
import { useContext, useState } from "react";
import LoggedInContext from "../contexts/LoggedInContext";
import InputField from "../forms/InputField";

const SignIn = () => {
  const [accessData, updateAccessToken, setUserId] =
    useContext(LoggedInContext);

  const [credentialsPack, setCredentialsPack] = useState(
    INITIAL_CREDENTIALS_STATE
  );

  // todo below function could be reuseable...
  const handleChangeInputField = (event) => {
    setCredentialsPack({
      ...credentialsPack,
      [event.target.id]: event.target.value,
    });
  };

  const sendCredentials = async () => {
    try {
      const response = await axios.post(
        API_URL + "/login/entering",
        credentialsPack
      );
      console.clear();
      console.log("response :>> ", response.data);

      updateAccessToken(response.data.token);
      setUserId(response.data.userId);
      console.log(
        "świeżo pozyskane dane :",
        accessData.userId,
        accessData.token
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();
    sendCredentials();
    setCredentialsPack(INITIAL_CREDENTIALS_STATE);
    // todo wstawienie faktu zalogowania w store lub contexie
    // todo wyczyszczenie pól w formularzu, zwlaszcza password
    // todo po udanym zalogowaniu, przekierować usera do PorchSite
  };

  //           this.$store.dispatch("setTodayDate");

  //         .catch((error) => {
  //           switch (error.response.status) {
  //             case 403:
  //               this.errorCode = 403; // not getting here
  //               break;
  //             case 404:
  //               this.errorCode = 404; // or here
  //               break;
  //             case 401:
  //               this.errorCode = 401; // or here
  //               break;
  //             default:
  //               console.log("some other error"); // end up here all the time
  //               break;
  //           }
  //         });
  //     },

  return (
    <>
      <h1 id="title">Logowanie</h1>
      <div>
        <form onSubmit={handleSubmitEvent}>
          <InputField
            title="Login (e-mail)"
            id="email"
            type="email"
            name="email"
            value={credentialsPack.email}
            onChange={handleChangeInputField}
          />

          <InputField
            title="Hasło"
            id="password"
            type="password"
            name="password"
            value={credentialsPack.password}
            onChange={handleChangeInputField}
          />
          <button type="submit">Zatwierdź</button>
        </form>
        {/* if "errorCode == 404" */}
        <div>
          <p>Nie ma użytkownika o podanym adresie email</p>
        </div>
        {/* if "errorCode == 401" */}
        <div>
          <p>Nieprawidłowy Login lub hasło</p>
        </div>
        {/* if "errorCode == 403" */}
        <div>
          <p>Konto nie zostało aktywowane, sprawdź swoją skrzynkę pocztową</p>
        </div>
      </div>
      <div>
        <div>
          <Link to="/">
            {/* buttony tez reusable */}
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
