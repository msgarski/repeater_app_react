import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../elements/LoadingSpinner";
import LessonsList from "../lessons/LessonsList";
import { useEffect, useState } from "react";
import { API_URL } from "../../general/constants";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import { addAllUserLessons } from "../../store/slices/allLessonsSlice";

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
    dispatch(addAllUserLessons(listOfLessons));
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
          <Link to={`/newlesson/${course_id}`}>
            <button>Dodaj nową lekcję</button>
          </Link>
        </div>
      </div>

      <div>
        {course.lesson_amount > 0 ? (
          <LessonsList lessons={lessons} />
        ) : (
          <div>
            <h2>Nie stworzyłeś jeszcze lekcji do tego kursu...</h2>
            <Link to={`/newlesson/${course_id}`}>
              <button>Stwórz pierwszą lekcję</button>
            </Link>
          </div>
        )}
        <LoadingSpinner />
      </div>
    </>
  );
};
export default CoursePage;
