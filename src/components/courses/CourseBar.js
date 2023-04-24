import { Link } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CourseBar = ({
  name,
  courseId,
  description,
  forLearning,
  repeats,
  cards,
  lessons,
  awkwards,
}) => {
  const getBatchLearningOfCourse = () => {
    console.log("idziemy się uczyć...");
    // zeroing store learning: setIndex, LoopNumber, setEndLearning
    // http request for: learning/CardsForLearningBatch/" + courseId + "/" + batchLimit
    // then router push /learningnew/courseId
  };

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <hr />
      <div>{name} </div>
      <div>opis: {description}</div>
      <p>
        lekcji: {lessons} kart: {cards}
      </p>
      <div>
        do nauki:
        {forLearning}
        {forLearning > 0 ? (
          // button as a link to={`/learningnew/${courseId}`}>
          <CustomButton onClickAction={getBatchLearningOfCourse}>
            Ucz się teraz
          </CustomButton>
        ) : null}
      </div>
      <div>
        powtórki: {repeats}{" "}
        {repeats > 0 ? (
          <CustomButton onClickAction={getBatchLearningOfCourse}>
            Powtarzaj teraz
          </CustomButton>
        ) : null}
      </div>
      <div>
        trudne słowa:
        {awkwards}
      </div>
      <hr />
    </>
  );
};
export default CourseBar;
