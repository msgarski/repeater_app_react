// import { Link } from "react-router-dom";
// import ListElement from "./ListElement";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const LessonsList = ({ lessons }) => {
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <p>lista lekcji</p>
      {/* <ul>
        {lessons.map((el) => {
          return (
            <li key={el.course_id}>
              <Link to={`/course/${el.course_id}`}>
                <ListElement
                  name={el.name}
                  description={el.description}
                  lessons={el.lesson_amount}
                  cards={el.card_amount}
                  forLearning={el.for_learning}
                  //todo button for learning if amount != 0
                  repeats={el.for_repeating}
                  //todo button for repeating if amount!=0
                />
              </Link>
            </li>
          );
        })}
      </ul> */}
    </>
  );
};

export default LessonsList;
