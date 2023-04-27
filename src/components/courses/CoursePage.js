import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../elements/LoadingSpinner";
import LessonsList from "../lessons/LessonsList";
import { useEffect, useState } from "react";
import { API_URL } from "../../general/constants";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import { addOneCourseLessons } from "../../store/slices/allLessonsSlice";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CoursePage = () => {
  const { token, userId, setTokenContext } = useAuthentication();
  const { course_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => {
    return state.courses;
  });
  const course = courses.find((el) => el.course_id === course_id);
  const [listOfLessons, setListOfLessons] = useState([]);
  const lessons = useSelector((state) => {
    return state.lessons;
  });
  // console.clear();

  useEffect(() => {
    if (course.lesson_amount) {
      getFullInfoOfUserLessons();
    }
  }, []);

  useEffect(() => {
    dispatch(addOneCourseLessons(listOfLessons));
  }, [listOfLessons]);
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */

  const getFullInfoOfUserLessons = async () => {
    try {
      const response = await axios.get(
        API_URL +
          "/courseQueries/getInfoOfCourseLessons/" +
          userId +
          "/" +
          course_id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "response.data.payload - list of lesssons: ",
        response.data.payload
      );
      setListOfLessons(response.data.payload);
      setTokenContext(response.data.newToken);
    } catch (error) {
      console.log("error", error);
    }
  };

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        Strona kursu: {course_id} {course.name}
      </div>
      <button onClick={() => navigate(-1)}>Powrót</button>
      <div>
        <div>
          <p>Twoje lekcje w kursie:</p>
        </div>
        <div>
          <button onClick={() => navigate(`/newlesson/${course_id}`)}>
            Dodaj nową lekcję
          </button>
        </div>
      </div>

      <div>
        {course.lesson_amount > 0 ? (
          <LessonsList lessons={lessons} />
        ) : (
          <div>
            <h2>Nie stworzyłeś jeszcze lekcji do tego kursu...</h2>
            <button onClick={() => navigate(`/newlesson/${course_id}`)}>
              Stwórz pierwszą lekcję
            </button>
          </div>
        )}
        <LoadingSpinner />
      </div>
    </>
  );
};
export default CoursePage;
