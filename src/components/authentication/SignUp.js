import { useState, useEffect, useRef } from "react";
import {
  SPECIAL_CHARS_ALLOWED_IN_PASSWORD,
  INITIAL_USER_SIGNUP_STATE,
} from "../../general/constants";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../forms/InputField";
import InfoModal from "../modals/InfoModal";
import { checkStringForSpecialChar } from "../../general/validators";
import {
  userExistsMessage,
  activationLinkMessage,
} from "../../general/messages";
import { type } from "@testing-library/user-event/dist/type";

//************************************************************************ */
// Function component
//************************************************************************ */
const SignUp = () => {
  const [signUpPack, setSignUpPack] = useState(INITIAL_USER_SIGNUP_STATE);
  const navigate = useNavigate();
  const passRef = useRef();
  const [typeOfInputField, setTypeOfInputField] = useState("password");

  useEffect(() => {
    let result = checkStringForSpecialChar(signUpPack.password);
    console.log("test hasła na speckal chars: ", result);
  }, [signUpPack.password, typeOfInputField]);

  const handleInputFieldToHookObject = (event) => {
    //
    setSignUpPack({
      ...signUpPack,
      [event.target.id]: event.target.value,
    });
  };

  // const showHidePassword = (passRef) => {
  //   console.log("co ma ref?: ", passRef.current);
  // };
  //*************************************************************************** */
  // Http request method
  //*************************************************************************** */

  //*************************************************************************** */
  // Form submition method
  //*************************************************************************** */
  const handleSubmitSignUpForm = (event) => {
    event.preventDefault();
  };
  const checkPass = () => {
    //
    console.log("sprawdzenie hasla: ", passRef.current.type);
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
          <button onClick={checkPass}>sprawdz!</button>
          <InputField
            title="Potwierdź hasło"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={signUpPack.password_confirmation}
            onChange={handleInputFieldToHookObject}
          />
          <section>
            <p>długość hasła - od 5 do 15 znaków</p>
            <p>
              obecność minimum jednego znaku specjalnego:{" "}
              {SPECIAL_CHARS_ALLOWED_IN_PASSWORD}
            </p>
            <p>obecność minimum jednej cyfry</p>
            <p>zgodność obu haseł</p>
          </section>

          <button> Stwórz konto</button>
        </form>
        {/* if="userId=='exists'" */}
        <div>
          <div>
            <InfoModal
              message={userExistsMessage}
              action={() => {
                navigate("/forgot");
              }}
            >
              Odzyskiwanie hasła
            </InfoModal>
          </div>
          <p>Popraw adres poczty elektronicznej</p>
        </div>

        <div>
          <InfoModal message={activationLinkMessage}>
            <a href="http://google.com">Wyjście</a>
          </InfoModal>
        </div>
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
