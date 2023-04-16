import { Link } from "react-router-dom";
import LessonBar from "./LessonBar";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const LessonsList = ({ lessons }) => {
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <ul>
        {lessons.map((el) => {
          return (
            <li key={el.lesson_id}>
              <Link to={`/lesson/${el.lesson_id}`}>
                <LessonBar name={el.name} lessonId={el.lesson_id} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LessonsList;
