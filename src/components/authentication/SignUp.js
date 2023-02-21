import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import InfoModal from "../modals/InfoModal";
import EmailDoubleFields from "../forms/EmailDoubleFields";
import PasswordDouble from "../forms/PasswordDouble";
import {
  userExistsMessage,
  activationLinkMessage,
} from "../../general/messages";

//************************************************************************ */
// Function component
//************************************************************************ */
const SignUp = () => {
  const navigate = useNavigate();
  const submitButtonRef = useRef(); // !czy to potzrzebne???
  const passRef = useRef();
  const emailRef = useRef();
  //******************************************************************* */
  // pass and email double reusable comps
  //********************************************************************** */
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
  // Form submition method
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

    setIsSubmitted(true);
    // todo http request
    // todo czyszczenie danych formularza w requescie
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
          <p>sekcja emaili:</p>
          {/* <EmailDoubleFields
            setEmailIsValid={setEmailIsValid}
            setNewEmail={setNewEmail}
            submition={isSubmitted}
            ref={emailRef}
          /> */}
          <hr />
          <p>sekcja haseł:</p>
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
          message={userExistsMessage}
          action={() => {
            navigate("/forgot");
          }}
        >
          Odzyskiwanie hasła
        </InfoModal>

        <InfoModal message={activationLinkMessage}>
          <a href="http://google.com">Wyjście</a>
        </InfoModal>
      </div>

      <div>
        <button>
          <Link to="/">Powrót do strony początkowej</Link>
        </button>
      </div>
    </>
  );
};

export default SignUp;
