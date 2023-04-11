import useAuthentication from "../../hooks/useAuthentication";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import { INITIAL_NEW_COURSE_DATA } from "../../general/constants";
import {
  checkProperStringLength,
  isStringExists,
} from "../../general/validators";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const NewCourse = () => {
  const { token, userId } = useAuthentication();
  const [newCourse, setNewCourse] = useState(INITIAL_NEW_COURSE_DATA);
  const navigate = useNavigate();

  const handleInputFieldToHookObject = (event) => {
    setNewCourse({
      ...newCourse,
      [event.target.id]: event.target.value,
    });
  };

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const requestData = {
    name: newCourse.name,
    description: newCourse.description,
    user_id: userId,
  };

  const addNewCourse = async () => {
    try {
      console.log("uruchomione tworzenie kursu...");
      const response = await axios.post("/course/createCourse", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response from new course: ", response);
      //todo redirecting to mainscreen, or to new course page
      setNewCourse(INITIAL_NEW_COURSE_DATA);
      // navigate(-1);
    } catch (error) {
      console.log("error from creating new course: ", error);
    }
  };

  const submitHandler = (event) => {
    console.log("submit formularza");
    isStringExists(newCourse.name);
    checkProperStringLength(newCourse.name, 3);

    event.preventDefault();
    addNewCourse();
  };

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <h3>Tworzenie nowego kursu</h3>
      </div>
      <form onSubmit={submitHandler}>
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="min. 3 znaki"
          value={newCourse.name}
          onChange={handleInputFieldToHookObject}
        />
        <div>
          <TextareaField
            rows="5"
            cols="50"
            id="description"
            name="description"
            placeholder="Tematyka kursu..."
            value={newCourse.description}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <button type="submit">Dodaj kurs</button>
        </div>
      </form>

      <div>
        <Link to="/mainscreen">
          <button>Anuluj</button>
        </Link>
      </div>
    </>
  );
};
export default NewCourse;
