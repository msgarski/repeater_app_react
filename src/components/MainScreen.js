import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { API_URL } from "../general/constants";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainScreen = () => {
  const { token, userId } = useAuthentication();

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */

  const getAllCoursesForUser = async () => {
    try {
      const response = await axios.get(
        // ! a token gdzie wsadzić?
        API_URL + "/course/getallcoursesforuser/" + userId
      );
      console.log("response.data: ", response.data);
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
