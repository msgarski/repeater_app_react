import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../../general/constants";
import UserNameField from "../forms/UserNameField";
import InfoModal from "../modals/InfoModal";
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

  let initialyRendered = useRef(false);

  //********************************************************************* */

  //*************************************************************************** */
  // Http request 2 methods
  //*************************************************************************** */
  const registerNewUser = async () => {
    try {
      const response = await axios.post(
        API_URL + "/signup/create",
        userDataRegistrationPack
      );
      console.log(response.data);
      console.log("cała odpowiedź ", response.data);
      setUserIdContext(response.data.userId);
      setIsSubmitted(true);
    } catch (error) {
      console.log("err, coś poszło nie tak...", error);
      if (error.response.status) {
        // setErrorCode(error.response.status);
      }
    }
  };

  // const fillOptionsTable = () => {
  //   /*
  //    *   Method for filling table of user main options
  //    *   with default values
  //    */

  //   // Object with data for filling options table in db:
  //   const pack2 = {
  //     learningBatch: this.$store.getters["option/getLearningBatchLimit"],
  //     learningLim: this.$store.getters["option/getLearningDayLimit"],
  //     repeatLim: this.$store.getters["option/getRepeatDayLimit"],
  //     overlearn: this.$store.getters["option/getOverlearning"],
  //     userId: this.userId,
  //   };

  //   // Http request to fill user options table in db:
  //   http
  //     .post("/options/insertOptions", pack2)
  //     .then((response) => {
  //       console.log("odpowiedź serwera na żądanie nr 2: ", response);
  //     })
  //     .catch((error) => {
  //       this.errorMessage = error.message;
  //       console.error("coś poszło nie tak...", error);
  //     });
  // };

  //*************************************************************************** */
  // Form submition section
  //*************************************************************************** */
  useEffect(() => {
    if (initialyRendered.current) {
      if (passIsValid && emailIsValid && nameIsValid) {
        submitButtonRef.current.disabled = false;
      }
      if (!passIsValid || !emailIsValid || !nameIsValid) {
        submitButtonRef.current.disabled = true;
      }
    } else {
      initialyRendered.current = true;
      nameRef.current.focus();
    }
  }, [passIsValid, emailIsValid, nameIsValid]);

  const handleSubmitSignUpForm = (event) => {
    console.log("tworzenie konta...");
    event.preventDefault();
    registerNewUser();
  };

  useEffect(() => {
    // todo next http request - fill user option data
    // fillOptionsTable();
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
        </form>

        {/* todo dać sekcję modali na zewnątrz */}
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
