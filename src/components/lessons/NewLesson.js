import { useNavigate, useParams } from "react-router-dom";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import useAuthentication from "../../hooks/useAuthentication";
import { INITIAL_NEW_COURSE_DATA } from "../../general/constants";
import { useState } from "react";
import axios from "axios";
import {
  isStringExists,
  checkProperStringLength,
} from "../../general/validators";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const NewLesson = () => {
  const navigate = useNavigate();
  const { course_id } = useParams();
  const { token, userId } = useAuthentication();
  const [newLesson, setNewLesson] = useState(INITIAL_NEW_COURSE_DATA);

  const handleInputFieldToHookObject = (event) => {
    setNewLesson({
      ...newLesson,
      [event.target.id]: event.target.value,
    });
  };

  // useEffect(() => {}, [newLesson]);
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const requestData = {
    name: newLesson.name,
    description: newLesson.description,
    courseId: course_id,
  };

  const addNewLesson = async () => {
    try {
      console.log("uruchomione tworzenie kursu...");
      const response = await axios.post("/lesson/create", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response from new course: ", response);
      //todo redirecting to mainscreen, or to new course page
      setNewLesson(INITIAL_NEW_COURSE_DATA);
      //! set new token !!!
      navigate(-1);
    } catch (error) {
      console.log("error from creating new course: ", error);
    }
  };

  const submitHandler = (event) => {
    console.log("submit formularza");
    isStringExists(newLesson.name);
    checkProperStringLength(newLesson.name, 3);

    event.preventDefault();
    addNewLesson();
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <div>
          <h3>Tworzenie nowej lekcji do kursu nr:</h3>
        </div>

        <form onSubmit={submitHandler}>
          <div>
            <label>Temat lekcji</label>
            <InputField
              type="text"
              name="name"
              id="name"
              onChange={handleInputFieldToHookObject}
              value={newLesson.name}
            />
          </div>

          <div>
            <label>Opis lekcji</label>
            <TextareaField
              rows="5"
              cols="50"
              id="description"
              name="description"
              placeholder="Tematyka lekcji..."
              onChange={handleInputFieldToHookObject}
              value={newLesson.description}
            ></TextareaField>
          </div>

          <div>
            <div id="btn">
              <button type="submit">Dodaj lekcję</button>
            </div>
          </div>
        </form>
        <div id="btn">
          <button onClick={() => navigate(-1)}>Anuluj</button>
        </div>
      </div>
    </>
  );
};

export default NewLesson;
