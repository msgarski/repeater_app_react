import { Link } from "react-router-dom";
import CoursesList from "./listings/CoursesList";
import { useEffect, useRef, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../general/constants";
import { shouldWeUpdateContextJWT } from "../general/axiosMethods";
import { useDispatch, useSelector } from "react-redux";
import { addListUserCoursesWithFullInfo } from "../store/slices/allCoursesSlice";
import LoadingSpinner from "./elements/LoadingSpinner";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, userId, setTokenContext } = useAuthentication();
  const firstTimeRef = useRef(true);
  const dispatch = useDispatch();
  const [allCoursesList, setAllCoursesList] = useState([]);
  const allUserCourses = useSelector((state) => {
    return state.courses;
  });

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */

  //******************************************************************************* */
  // General user courses info request
  //******************************************************************************* */

  const getUserCoursesFullInfo = async () => {
    try {
      const response = await axios.get(
        API_URL + "/courseQueries/getFullInfoOfUserCourses/" + userId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response.data: ", response.data.payload);
      setAllCoursesList(response.data.payload);

      let result = shouldWeUpdateContextJWT(response, token);
      if (result) {
        setTokenContext(response.data.newToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // console.clear();
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
    } else {
      dispatch(addListUserCoursesWithFullInfo(allCoursesList));
    }
  }, [allCoursesList, dispatch]);

  useEffect(() => {
    setTimeout(getUserCoursesFullInfo, 500);
    // getUserCoursesFullInfo();
  }, []);
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <Link to="/newcourse">
          <button>Dodaj kurs</button>
        </Link>
      </div>
      <div>
        <Link to="/mainoptions">
          <button>Opcje główne</button>
        </Link>
      </div>
      <div>
        <div>
          <p>Twoje kursy:</p>
        </div>
        <div>Oczekujące testy</div>

        <div>Powtórki na dziś</div>
      </div>
      {!isLoading ? (
        <div>
          {allUserCourses.length ? (
            <CoursesList courses={allUserCourses} />
          ) : (
            <p>nie masz jeszcze utworzonych żadnych kursów</p>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}

      <Link to="/porch">
        <button>Powrót</button>
      </Link>
    </>
  );
};

export default MainScreen;
