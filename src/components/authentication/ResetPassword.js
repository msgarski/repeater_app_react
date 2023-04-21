import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../general/constants";
import InfoModal from "../modals/InfoModal";
import PasswordDouble from "../forms/PasswordDouble";
//************************************************************************ */
// Function component
//************************************************************************ */
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
        // todo password has changed... info for user in modal
      } else if (response.status === 401) {
        //todo info for user about failure
        console.log("zły token - nie zmieniono hasła!");
      }
    } catch (report) {
      // todo depend on error type, set user or message state to false
      console.log("error: ", report);
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
