import { useNavigate, useParams } from "react-router-dom";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import useAuthentication from "../../hooks/useAuthentication";
import { INITIAL_NEW_COURSE_DATA } from "../../general/constants";
import { useState, useRef, useEffect } from "react";
import InputValidationMessages from "../forms/InputValidationMessages";
import axios from "axios";
import {
  isStringExists,
  checkProperStringLength,
} from "../../general/validators";
//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const NewLesson = () => {
  const submitButtonRef = useRef();
  const messageRef = useRef();
  const navigate = useNavigate();
  const { course_id } = useParams();
  const { token, userId, setTokenContext } = useAuthentication();
  const [newLesson, setNewLesson] = useState(INITIAL_NEW_COURSE_DATA);

  const handleInputFieldToHookObject = (event) => {
    setNewLesson({
      ...newLesson,
      [event.target.id]: event.target.value,
    });
  };

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const requestData = {
    name: newLesson.name,
    description: newLesson.description,
    courseId: course_id,
    user_id: userId,
  };

  const addNewLesson = async () => {
    try {
      const response = await axios.post("/lesson/create", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewLesson(INITIAL_NEW_COURSE_DATA);
      setTokenContext(response.data);
      navigate(-1);
    } catch (error) {
      console.log("error from creating new course: ", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    addNewLesson();
  };

  useEffect(() => {
    submitButtonRef.current.disabled = !isStringExists(newLesson.name);
    newLesson.name
      ? (messageRef.current.hidden = checkProperStringLength(
          newLesson.name,
          3,
          50
        ))
      : (messageRef.current.hidden = true);

    checkProperStringLength(newLesson.description, 0, 200);
  }, [newLesson.name, newLesson.description]);
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
          <p ref={messageRef} hidden>
            Temat lekcji powinien mieć minimum 3 znaki
          </p>

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
              <button type="submit" ref={submitButtonRef} disabled>
                Dodaj lekcję
              </button>
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
