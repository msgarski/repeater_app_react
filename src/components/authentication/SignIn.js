//todo import { http } from "../../general/axios";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../general/constants";
import { useContext, useState } from "react";
import LoggedInContext from "../contexts/LoggedInContext";

const SignIn = () => {
  const [accessData, updateAccessToken, setUserId] =
    useContext(LoggedInContext);

  const INITIAL_CREDENTIALS_STATE = {
    email: "",
    password: "",
    expiresIn: null, // todo is this needed?
  };

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
          {/* //todo insert reusable components instead of below fields: */}
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={credentialsPack.email}
              onChange={handleChangeInputField}
            />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentialsPack.password}
              onChange={handleChangeInputField}
            />
          </div>
          <button type="submit">Zatwierdź</button>
        </form>
        {/* if "errorCode == 404" */}
        <div>
          <p>Nie ma usera</p>
        </div>
        {/* if "errorCode == 401" */}
        <div>
          <p>Błąd logowania</p>
        </div>
        {/* if "errorCode == 403" */}
        <div>
          <p>Konto nieaktywne</p>
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
