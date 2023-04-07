import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../elements/LoadingSpinner";
import { Link } from "react-router-dom";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CoursePage = () => {
  const { course_id } = useParams();
  const courses = useSelector((state) => {
    return state.courses;
  });
  const course = courses.find((el) => el.course_id === course_id);
  console.clear();
  console.log("course", course);
  const navigate = useNavigate();

  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */

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
        {/* v-if="lessons" */}
        <ul>
          {/* v-if="(lessons.length != 0) && lessonsInfoIsLoaded" */}
          {/* :key="lesson.lesson_id"
                    :lessonId="lesson.lesson_id"
                    :name="lesson.name" 
                    :description="lesson.description" */}
        </ul>
        {/* v-else-if="!lessonsInfoIsLoaded" */}
        <LoadingSpinner />
        <div>
          {/* v-if="lessons.length == 0" */}
          <h2>Nie stworzyłeś jeszcze lekcji do tego kursu...</h2>

          <button>Dodaj lekcję</button>
        </div>
      </div>
    </>
  );
};
export default CoursePage;
