import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../general/constants";
import InfoModal from "../modals/InfoModal";
import { useNavigate } from "react-router-dom";
import PasswordDouble from "../forms/PasswordDouble";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const redirectToSignIn = () => {
    navigate("/signin");
  };
  const submitButtonRef = useRef();
  const passRef = useRef();
  const [passIsValid, setPassIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //*********************************************************************************** */
  //  http request method
  //********************************************************************************** */
  const sendNewPasswordToServer = async () => {
    let postPack = {
      password1: passRef.current.value,
      password2: passRef.current.value,
    };
    let url = "/password/newpassword/" + resetToken;
    console.clear();
    try {
      console.log("postPack", postPack);
      const response = await axios.post(API_URL + url, postPack);

      setIsSubmitted(true);

      if (response.status === 200) {
        console.log("response :>> ", response);

        // todo password has changed...
      } else if (response.status === 401) {
        console.log("zły token - nie zmieniono hasła!");
        // todo bad tooken, pass has not been changed
      }
    } catch (err) {
      // todo depend on error type, set user or message state to false
      console.log("error: ", err);
    }
  };
  //************************************************************************************ */
  //  password validation
  //************************************************************************************ */
  useEffect(() => {
    if (passIsValid) {
      submitButtonRef.current.disabled = false;
    }
    if (!passIsValid) {
      submitButtonRef.current.disabled = true;
    }
  }, [passIsValid]);
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

      <form onSubmit={handleSubmitForm}>
        <p>Wprowadź nowe hasło:</p>
        <PasswordDouble
          setPassIsValid={setPassIsValid}
          submition={isSubmitted}
          ref={passRef}
        />
        <button type="submit" ref={submitButtonRef} disabled>
          Wyślij
        </button>
      </form>

      <div>
        <InfoModal
          message="Hasło zostało zmienione, możesz się nim logować"
          action={redirectToSignIn}
        >
          Logowanie
        </InfoModal>
      </div>
    </>
  );
};

export default ResetPassword;
