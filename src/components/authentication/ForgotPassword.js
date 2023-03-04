import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import EmailDouble from "../forms/EmailDouble";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../general/constants";
import InfoModal from "../modals/InfoModal";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(true);
  const [messageState, setMessageState] = useState(false);
  //****************************************************************** */
  const submitButtonRef = useRef();
  const emailRef = useRef();
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //******************************************************************************** */
  //  sending http request method
  //******************************************************************************** */
  const sendForgottenPasswordForm = async () => {
    try {
      const response = await axios.post(API_URL + "/password/checking", {
        email: emailRef.current.value,
      });
      console.clear();
      // console.log("oto nasza odpowiedz: ", response.data);
      setIsSubmitted(true);
      if (response.status === 200) setMessageState(true);
      setUserState(true);
      // console.log("response :>> ", response.data);
    } catch (err) {
      // todo depend on error type, set user or message state to false
      if (err.response.status === 404) {
        setUserState(false);
      }
      console.log("error: ", err.response.status);
    }
  };
  //*********************************************************************** */
  // Validation section
  //*************************************************************************** */
  useEffect(() => {
    console.log(
      "sprawdzenie refa w forgocie: ",
      submitButtonRef.current.disabled
    );
    if (emailIsValid) {
      submitButtonRef.current.disabled = false;
    }
    if (!emailIsValid) {
      submitButtonRef.current.disabled = true;
    }
  }, [emailIsValid]);
  //***************************************************************************** */
  //  submitting form method
  //**************************************************************************** */
  const handleSubmitForm = (event) => {
    event.preventDefault();

    sendForgottenPasswordForm();
  };
  const turnBack = () => navigate("/");

  //***************************************************************************************
  //  JSX code
  //**************************************************************************************
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
        <form onSubmit={handleSubmitForm}>
          <hr />
          <EmailDouble
            setEmailIsValid={setEmailIsValid}
            submition={isSubmitted}
            ref={emailRef}
          />
          <hr />
          <button type="submit" ref={submitButtonRef} disabled>
            Wyślij
          </button>
        </form>
      </div>

      <div>
        <CustomButton onClickAction={turnBack}>Wyjście</CustomButton>
      </div>

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
    </>
  );
};

export default ForgotPassword;
