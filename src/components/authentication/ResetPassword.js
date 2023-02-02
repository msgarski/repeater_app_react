import { useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "../forms/InputField";
import { INITIAL_PASSWORD_RESETING_STATE } from "../../general/constants";
import axios from "axios";
import { API_URL } from "../../general/constants";
import InfoModal from "../modals/InfoModal";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const redirectToSignIn = () => {
    navigate("/signin");
  };

  // console.log(" resetToken:>> ", resetToken);

  const [passwordPack, setPasswordPack] = useState(
    INITIAL_PASSWORD_RESETING_STATE
  );

  const handleChangeInputField = (event) => {
    // console.log("event.target.value", event.target.value);
    setPasswordPack({
      ...passwordPack,
      [event.target.id]: event.target.value,
    });
  };
  //*********************************************************************************** */
  //  http request method
  //********************************************************************************** */
  const sendNewPasswordToServer = async () => {
    let postPack = passwordPack;
    let url = "/password/newpassword/" + resetToken;
    console.clear();
    try {
      const response = await axios.post(API_URL + url, postPack);

      setPasswordPack(INITIAL_PASSWORD_RESETING_STATE);

      if (response.status === 200) {
        console.log("response :>> ", response);

        setPasswordPack({
          ...passwordPack,
          changed: true,
        });
      } else if (response.status === 401) {
        console.log("zły token - nie zmieniono hasła!");
      }
    } catch (err) {
      // todo depend on error type, set user or message state to false
      console.log("error: ", err);
    }
  };
  //************************************************************************************ */
  //  password validation
  //************************************************************************************ */

  //*********************************************************************************** */
  //  form submitting method and sending http request
  //********************************************************************************** */
  const handleSubmitForm = (event) => {
    event.preventDefault();
    sendNewPasswordToServer();
  };

  //*********************************************************************************** */
  // JSX code
  //*********************************************************************************** */
  return (
    <>
      <div>Resetowanie starego hasła</div>
      <div>
        {passwordPack.changed ? (
          <InfoModal
            message="Hasło zostało zmienione, możesz się nim logować"
            action={redirectToSignIn}
          />
        ) : (
          <p></p>
        )}
      </div>

      <form onSubmit={handleSubmitForm}>
        <p>Wprowadź nowe hasło:</p>
        <InputField
          id="password1"
          title="Podaj nowe hasło"
          type="password"
          value={passwordPack.password1}
          name="password"
          onChange={handleChangeInputField}
        ></InputField>

        <InputField
          id="password2"
          title="Powtórz nowe hasło"
          type="password"
          value={passwordPack.password2}
          name="password"
          onChange={handleChangeInputField}
        ></InputField>

        <button>Wyślij</button>
      </form>
    </>
  );
};

export default ResetPassword;
