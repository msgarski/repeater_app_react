import { useParams, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../../general/constants";
import CustomButton from "../buttons/CustomButton";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { INITIAL_NEW_COURSE_DATA } from "../../general/constants";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const EditLesson = () => {
  const { token, userId, setTokenContext } = useAuthentication();
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = useSelector((state) =>
    state.lessons.filter((element) => element.lesson_id === lessonId)
  );
  let oldLessonInfo = { ...INITIAL_NEW_COURSE_DATA };
  if (lesson) {
    oldLessonInfo = {
      name: lesson[0].name,
      description: lesson[0].description,
    };
  }
  const [lessonInfo, setLessonInfo] = useState(oldLessonInfo);

  console.log("lesson", lesson[0].name);

  const handleInputFieldToHookObject = (event) => {
    setLessonInfo({
      ...lessonInfo,
      [event.target.id]: event.target.value,
    });
  };
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const pack = {
    name: lessonInfo.name,
    description: lessonInfo.description,
    lessonId: lessonId,
    userId: userId,
  };

  const updateLessonRecord = async () => {
    try {
      const response = await axios.post(
        API_URL + "/lesson/updatingLessonInfo/",
        pack,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLessonInfo(INITIAL_NEW_COURSE_DATA);
      console.log("response", response);
      navigate(-1);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const handleEditLessonForm = (event) => {
    event.preventDefault();
    console.log("pack of edited lesson: ", pack);
    updateLessonRecord();
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <h3>Edycja lekcji</h3>
      </div>
      <form onSubmit={handleEditLessonForm}>
        <div>
          <InputField
            type="text"
            title="Zmień temat lekcji"
            name="name"
            id="name"
            value={lessonInfo.name}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <label>Zmień opis lekcji</label>
          <TextareaField
            rows="5"
            cols="50"
            id="description"
            name="description"
            placeholder="Tematyka lekcji..."
            value={lessonInfo.description}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <button type="submit">Zatwierdź zmiany</button>
        </div>
      </form>
      <div>
        <CustomButton onClickAction={() => navigate(-1)}>Anuluj</CustomButton>
      </div>
    </>
  );
};
export default EditLesson;
