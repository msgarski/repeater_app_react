import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
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
  const passRef = useRef();
  const emailRef = useRef();

  const [passIsValid, setPassIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  //********************************************************************* */

  const handleInputField = (event) => {
    setNewName(event.target.value);
  };

  //*************************************************************************** */
  // Http request 2 methods
  //*************************************************************************** */

  //*************************************************************************** */
  // Form submition section
  //*************************************************************************** */
  useEffect(() => {
    if (passIsValid && emailIsValid) {
      submitButtonRef.current.disabled = false;
    }
    if (!passIsValid || !emailIsValid) {
      submitButtonRef.current.disabled = true;
    }
  }, [passIsValid, emailIsValid]);

  const handleSubmitSignUpForm = (event) => {
    console.log("tworzenie konta...");
    event.preventDefault();

    // todo construct request data pack
    let password = passRef.current.value;
    console.log("passwword", password);

    // todo http request
    // todo czyszczenie danych formularza w requescie
    setIsSubmitted(true);
    // todo next http request - fill user option data
  };

  //************************************************************************** */
  // JSX code section
  //************************************************************************** */
  return (
    <>
      <h1>Rejestracja</h1>

      <div>
        <form onSubmit={handleSubmitSignUpForm}>
          <InputField
            title="Imię"
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={handleInputField}
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
        {/* if="userId=='exists'" */}
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
