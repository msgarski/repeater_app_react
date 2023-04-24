import { useParams, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../../general/constants";
import CustomButton from "../buttons/CustomButton";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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
  console.log("lesson", lesson[0].name);

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const pack = {
    name: "próbna nazwa",
    description: "opis próbny",
    // courseId: null,
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
      console.log("response", response);
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
            value={lesson[0].name}
            // onChange={}
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
            value={lesson[0].description}
            // onChange={}
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
