import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import InfoModal from "../modals/InfoModal";
import ValidationUi from "../forms/ValidationUi";
import { INITIAL_USER_SIGNUP_STATE } from "../../general/constants";
import { checkStringForSpecialChar } from "../../general/validators";
import {
  userExistsMessage,
  activationLinkMessage,
} from "../../general/messages";

//************************************************************************ */
// Function component
//************************************************************************ */
const SignUp = () => {
  const [signUpPack, setSignUpPack] = useState(INITIAL_USER_SIGNUP_STATE);
  const [typeOfInputField, setTypeOfInputField] = useState("password");
  const navigate = useNavigate();
  const passRef = useRef();

  useEffect(() => {
    let result = checkStringForSpecialChar(signUpPack.password);
    console.log("test hasła na speckal chars: ", result);
  }, [signUpPack.password, typeOfInputField]);

  const handleInputFieldToHookObject = (event) => {
    setSignUpPack({
      ...signUpPack,
      [event.target.id]: event.target.value,
    });
  };

  //*************************************************************************** */
  // Http request method
  //*************************************************************************** */

  //*************************************************************************** */
  // Form submition method
  //*************************************************************************** */
  const handleSubmitSignUpForm = (event) => {
    console.log("tworzenie konta...");
    event.preventDefault();
  };
  //************************************************************************** */
  // Validation rules
  //************************************************************************** */
  const checkPass = () => {
    console.log("uwidocznienie hasla: ", passRef.current.type);
    setTypeOfInputField(typeOfInputField ? "" : "password");
    console.log("typ: ", typeOfInputField);
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
            value={signUpPack.name}
            onChange={handleInputFieldToHookObject}
          />

          <InputField
            title="Adres e-mail"
            type="email"
            name="email"
            id="email"
            value={signUpPack.email}
            onChange={handleInputFieldToHookObject}
          />
          <InputField
            ref={passRef}
            title="Hasło"
            type={typeOfInputField}
            name="password"
            id="password"
            value={signUpPack.password}
            onChange={handleInputFieldToHookObject}
          />
          <InputField
            title="Potwierdź hasło"
            type={typeOfInputField}
            name="password_confirmation"
            id="password_confirmation"
            value={signUpPack.password_confirmation}
            onChange={handleInputFieldToHookObject}
          />
          <button onClick={checkPass}>zobacz hasło</button>

          <button> Stwórz konto</button>
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
