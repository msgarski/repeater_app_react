import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { API_URL, INITIAL_USER_OPTIONS_PACK } from "../../general/constants";
import UserNameField from "../forms/UserNameField";
import InfoModal from "../modals/InfoModal";
import RegisterSubmitMessages from "../forms/RegisterSubmitMessages";
import EmailDouble from "../forms/EmailDouble";
import PasswordDouble from "../forms/PasswordDouble";
import {
  userAlreadyExistsMessage,
  activationLinkSentMessage,
} from "../../general/messages";
//************************************************************************ */
// Function component
//************************************************************************ */
const SignUp = () => {
  const navigate = useNavigate();
  const submitButtonRef = useRef();
  const passRef = useRef("");
  const emailRef = useRef("");
  const nameRef = useRef("");
  const [passIsValid, setPassIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userId, setUserIdContext } = useAuthentication();
  const userDataRegistrationPack = {
    name: nameRef.current.value,
    email: emailRef.current.value,
    password: passRef.current.value,
    password_confirmation: passRef.current.value,
  };
  let alreadyRendered = useRef(false);
  //*************************************************************************** */
  // Http request 2 methods
  //*************************************************************************** */
  const registerNewUser = async () => {
    try {
      const response = await axios.post(
        API_URL + "/signup/create",
        userDataRegistrationPack
      );
      setIsSubmitted(true);
      setUserIdContext(response.data);
    } catch (error) {
      console.log("err, coś poszło nie tak...", error);
      if (error.response.status) {
      }
    }
  };
  const fillUserOptionsTable = async () => {
    /*
     *   Method for filling table of user main options
     *   with default values
     */
    try {
      const response = await axios.post(
        API_URL + "/options/insertOptions",
        INITIAL_USER_OPTIONS_PACK
      );
      console.log("response", response);
    } catch (error) {
      console.log("err, coś poszło nie tak...", error);
      if (error.response.status) {
        // setErrorCode(error.response.status);
      }
    }
  };
  //*************************************************************************** */
  // Form submition section
  //*************************************************************************** */
  useEffect(() => {
    if (alreadyRendered.current) {
      if (passIsValid && emailIsValid && nameIsValid) {
        submitButtonRef.current.disabled = false;
      }
      if (!passIsValid || !emailIsValid || !nameIsValid) {
        submitButtonRef.current.disabled = true;
      }
    } else {
      alreadyRendered.current = true;
      nameRef.current.focus();
    }
  }, [passIsValid, emailIsValid, nameIsValid]);
  const handleSubmitSignUpForm = (event) => {
    event.preventDefault();
    registerNewUser();
  };
  useEffect(() => {
    if (userId) {
      INITIAL_USER_OPTIONS_PACK.userId = userId;
      fillUserOptionsTable();
    }
  }, [userId]);
  //************************************************************************** */
  // JSX code section
  //************************************************************************** */
  return (
    <>
      <h1>Rejestracja</h1>
      <div>
        <form onSubmit={handleSubmitSignUpForm}>
          <UserNameField
            setNameIsValid={setNameIsValid}
            submition={isSubmitted}
            ref={nameRef}
          />
          <hr />
          <EmailDouble
            setEmailIsValid={setEmailIsValid}
            submition={isSubmitted}
            ref={emailRef}
          />
          <hr />
          <PasswordDouble
            setPassIsValid={setPassIsValid}
            submition={isSubmitted}
            ref={passRef}
          />
          <hr />
          <button ref={submitButtonRef} disabled>
            Stwórz konto
          </button>
          <RegisterSubmitMessages
            nameIsValid={nameIsValid}
            emailIsValid={emailIsValid}
            passIsValid={passIsValid}
          />
          <hr />
        </form>
        <InfoModal
          message={userAlreadyExistsMessage}
          action={() => {
            navigate("/forgot");
          }}
        >
          Odzyskiwanie hasła
        </InfoModal>
        <hr />
        <InfoModal message={activationLinkSentMessage}>
          <a href="http://google.com">Wyjście</a>
        </InfoModal>
      </div>
      <hr />
      <div>
        <button>
          <Link to="/">Powrót do strony początkowej</Link>
        </button>
      </div>
    </>
  );
};
export default SignUp;
