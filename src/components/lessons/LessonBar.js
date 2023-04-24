import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const LessonBar = ({
  name,
  lessonId,
  courseId,
  cards,
  description,
  forLearning,
  repeats,
  awkwards,
}) => {
  const navigate = useNavigate();
  const getBatchLearningOfCourse = () => {
    console.log("idziemy do nauki...");
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <hr />
      <p>Pasek lekcji {name}</p>
      <section>
        <div>
          <Link to={`/massimport/${lessonId}`}>
            <button>dodaj wiele kart</button>
          </Link>
        </div>
        <div>
          <Link to={`/singleimport/${lessonId}`}>
            <button>dodaj karty pojedynczo</button>
          </Link>
        </div>
      </section>
      <Link to={`/lesson/${lessonId}`}>
        <div>temat lekcji: {name} </div>
        <div>opis: {description}</div>
        <p>kart w lekcji: {cards}</p>
        <div>
          do nauki:
          {forLearning}
        </div>
        <div>do powtórki: {repeats}</div>
        {/* <div>
        trudne słowa:
        {awkwards}
      </div> */}
      </Link>
      <div>
        {forLearning > 0 ? (
          <Link to={`/learningnew/${courseId}`}>
            <CustomButton onClickAction={getBatchLearningOfCourse}>
              Ucz się teraz
            </CustomButton>
          </Link>
        ) : null}
      </div>
      <div>
        {repeats > 0 ? (
          <CustomButton onClickAction={getBatchLearningOfCourse}>
            Powtarzaj teraz
          </CustomButton>
        ) : null}
      </div>
      <section>
        <Link to={`/editlesson/${lessonId}`}>
          <CustomButton>Edytuj lekcję</CustomButton>
        </Link>
        <CustomButton>Usuń lekcję</CustomButton>
      </section>

      <hr />
    </>
  );
};
export default LessonBar;
