import { useState, useEffect, forwardRef } from "react";
import NameMessage from "./NameMessage";
import {
  INITIAL_USER_NAME_VALIDATION_STATE,
  MINIMUM_USER_NAME_LENGTH,
} from "../../general/constants";
import {
  isStringExists,
  checkProperStringLength,
} from "../../general/validators";

//************************************************************************ */
// Function component
//************************************************************************ */
const UserNameField = forwardRef(({ setNameIsValid, submition }, nameRef) => {
  const [nameValidationState, setNameValidationState] = useState(
    INITIAL_USER_NAME_VALIDATION_STATE
  );

  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName("");
  }, [submition]);

  useEffect(() => {
    if (checkProperStringLength(userName, MINIMUM_USER_NAME_LENGTH)) {
      setNameValidationState({
        nonOmitted: true,
        properLength: true,
      });
      setNameIsValid(true);
    }
    if (!checkProperStringLength(userName, MINIMUM_USER_NAME_LENGTH)) {
      setNameValidationState({
        nonOmitted: true,
        properLength: false,
      });
      setNameIsValid(false);
    }
  }, [userName, setNameIsValid]);

  const handleInputField = (event) => {
    setUserName(event.target.value);
  };
  //**************************************************************************** */
  // Validation Rules Section
  //****************************************************************************** */

  const validateNameField = (moveDirection) => {
    switch (moveDirection) {
      case "out":
        console.log(
          "zejscie z pola name...",
          isStringExists(userName),
          checkProperStringLength(userName, MINIMUM_USER_NAME_LENGTH)
        );
        setNameValidationState({
          ...nameValidationState,
          nonOmitted: isStringExists(userName),
          properLength: checkProperStringLength(
            userName,
            MINIMUM_USER_NAME_LENGTH
          ),
        });
        break;
      case "in":
        console.log("wejscie na  pole name...");
        setNameValidationState({
          ...nameValidationState,
          nonOmitted: true,
          properLength: checkProperStringLength(
            userName,
            MINIMUM_USER_NAME_LENGTH
          ),
        });
        break;
      default:
        setNameValidationState(INITIAL_USER_NAME_VALIDATION_STATE);
    }
  };
  //**************************************************************************** */
  // JSX code section
  //**************************************************************************** */
  return (
    <>
      <div>user name</div>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleInputField}
        onBlur={() => {
          validateNameField("out");
        }}
        onFocus={() => {
          validateNameField("in");
        }}
        value={userName || ""}
        ref={nameRef}
      />
      <NameMessage
        exists={nameValidationState.nonOmitted}
        properLength={nameValidationState.properLength}
      />
    </>
  );
});

export default UserNameField;
