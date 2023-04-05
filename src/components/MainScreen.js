import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../general/constants";
import { shouldWeUpdateContextJWT } from "../general/axiosMethods";
import { useDispatch, useSelector } from "react-redux";
import { addListUserCoursesWithFullInfo } from "../store/slices/allCoursesSlice";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainScreen = () => {
  const { token, userId, setTokenContext } = useAuthentication();
  const firstTimeRef = useRef(true);
  const dispatch = useDispatch();
  const [allCoursesList, setAllCoursesList] = useState([]);
  const allUserCoursesInfo = useSelector((state) => {
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
    // getAllCoursesForUser();
    getUserCoursesFullInfo();
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
        {/* <router-link to="/settings"> */}
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

      <div>
        {/* <div v-if="coursesAreLoaded"> 
                <ul v-if="coursesInfoAreLoaded">
                    <user-course 
                        v-for="course in courses" 
                            :key="course.course_id"
                            :courseId="course.course_id"
                            :name="course.name" 
                            :description="course.description">
                    </user-course>
                </ul>
                <div v-else-if="!coursesInfoAreLoaded"><h1>Loading ...</h1></div>
                <div v-else-if="courses.length == 0">Nie masz żadnych kursów, <router-link to="/newcourse">Dodaj jakiś kurs</router-link></div>
            </div> */}
        {/* <div v-else-if="!coursesAreLoaded">
                    <h1>Loading...</h1>
            </div>
            <div > */}
        <div>
          <Link to="/porch">
            <button>Powrót</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
