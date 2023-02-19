import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import InfoModal from "../modals/InfoModal";
import ValidationUi from "../forms/ValidationUi";
import PasswordDoubleFields from "../forms/PasswordDoubleFields";
import EmailDoubleFields from "../forms/EmailDoubleFields";
import {
  userExistsMessage,
  activationLinkMessage,
} from "../../general/messages";

//************************************************************************ */
// Function component
//************************************************************************ */
const SignUp = () => {
  const navigate = useNavigate();
  const buttonRef = useRef();
  //******************************************************************* */
  // pass and email double reusable comps
  //********************************************************************** */
  const [passIsValid, setPassIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  //********************************************************************* */

  const handleInputField = (event) => {
    setNewName(event.target.value);
  };

  //*************************************************************************** */
  // Http request method
  //*************************************************************************** */

  //*************************************************************************** */
  // Form submition method
  //*************************************************************************** */
  useEffect(() => {
    if (passIsValid && emailIsValid) {
      buttonRef.current.disabled = false;
    }
  }, [passIsValid, emailIsValid]);

  const handleSubmitSignUpForm = (event) => {
    console.log("tworzenie konta...");
    event.preventDefault();
    setIsSubmitted(true);
    // todo http request
    // todo czyszczenie danych formularza w requescie
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
          <EmailDoubleFields
            setEmailIsValid={setEmailIsValid}
            setNewEmail={setNewEmail}
            submition={isSubmitted}
          />
          <hr />
          <p>sekcja haseł:</p>
          <PasswordDoubleFields
            setPassIsValid={setPassIsValid}
            setNewPassword={setNewPassword}
            submition={isSubmitted}
          />
          <hr />

          <button ref={buttonRef} disabled>
            Stwórz konto
          </button>
        </form>
        {/* if="userId=='exists'" */}
        <InfoModal
          message={userExistsMessage}
          action={() => {
            navigate("/forgot");
          }}
        >
          Odzyskiwanie hasła
        </InfoModal>

        <ValidationUi />

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
