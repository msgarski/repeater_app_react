import { Link } from "react-router-dom";
import LessonBar from "./LessonBar";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const LessonsList = ({ lessons }) => {
  console.log("lessons", lessons);
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <ul>
        {lessons.map((el) => {
          return (
            <li key={el.lesson_id}>
              <LessonBar
                name={el.name}
                lessonId={el.lesson_id}
                description={el.description}
                cards={el.card_amount}
                forLearning={el.for_learning}
                repeats={el.for_repeating}
                // awkwards={}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LessonsList;
