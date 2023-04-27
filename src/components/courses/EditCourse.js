import { useParams, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import { API_URL, INITIAL_NEW_COURSE_DATA } from "../../general/constants";
import CustomButton from "../buttons/CustomButton";
import DeleteButton from "../buttons/DeleteButton";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  checkProperStringLength,
  isStringExists,
} from "../../general/validators";
import userEvent from "@testing-library/user-event";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const EditCourse = () => {
  const submitButtonRef = useRef();
  const messageRef = useRef();
  const [deleteCourse, setDeleteCourse] = useState(false);
  const { token, userId, setTokenContext } = useAuthentication();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = useSelector((state) =>
    state.courses.filter((element) => element.course_id === courseId)
  );
  let oldCourseInfo = { ...INITIAL_NEW_COURSE_DATA };
  if (course) {
    oldCourseInfo = {
      name: course[0].name,
      description: course[0].description,
    };
  }
  const [courseInfo, setCourseInfo] = useState(oldCourseInfo);

  const handleInputFieldToHookObject = (event) => {
    setCourseInfo({
      ...courseInfo,
      [event.target.id]: event.target.value,
    });
  };
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const pack = {
    name: courseInfo.name,
    description: courseInfo.description,
    courseId: courseId,
    userId: userId,
  };

  const updateLessonRecord = async () => {
    try {
      const response = await axios.post(
        API_URL + "/course/updatingCourseInfo/",
        pack,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response updating course info: ", response);
      setTokenContext(response.data);
      setCourseInfo(INITIAL_NEW_COURSE_DATA);
      navigate(-1);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const deleteThisCourse = () => {
    setDeleteCourse(true);
    setTimeout(() => {
      setDeleteCourse(false);
    }, 2000);
  };

  const handleEditCourseForm = (event) => {
    event.preventDefault();
    console.log("pack of edited course: ", pack);
    updateLessonRecord();
  };

  useEffect(() => {
    submitButtonRef.current.disabled =
      !isStringExists(courseInfo.name) ||
      (courseInfo.name === oldCourseInfo.name &&
        courseInfo.description === oldCourseInfo.description);

    courseInfo.name
      ? (messageRef.current.hidden = checkProperStringLength(
          courseInfo.name,
          3,
          50
        ))
      : (messageRef.current.hidden = true);

    checkProperStringLength(courseInfo.description, 0, 200);
  }, [courseInfo.name, courseInfo.description]);
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <h3>Edycja lekcji</h3>
      </div>
      <div>
        {deleteCourse === true ? (
          <div>usuwanie kursu...</div>
        ) : (
          <DeleteButton type="button" onClickAction={deleteThisCourse}>
            Usuń kurs
          </DeleteButton>
        )}
      </div>
      <form onSubmit={handleEditCourseForm}>
        <div>
          <InputField
            type="text"
            title="Zmień temat lekcji"
            name="name"
            id="name"
            value={courseInfo.name}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <p ref={messageRef} hidden>
          Temat kursu powinien mieć minimum 3 znaki
        </p>
        <div>
          <label>Zmień opis kursu</label>
          <TextareaField
            rows="5"
            cols="50"
            id="description"
            name="description"
            placeholder="Tematyka lekcji..."
            value={courseInfo.description}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <button type="submit" ref={submitButtonRef} disabled>
            Zatwierdź zmiany
          </button>
        </div>
      </form>
      <div>
        <CustomButton onClickAction={() => navigate(-1)}>Anuluj</CustomButton>
      </div>
    </>
  );
};
export default EditCourse;
