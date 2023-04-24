import CourseBar from "./CourseBar";
//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CourseDetails = ({ courses }) => {
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <ul>
        {courses.map((el) => {
          return (
            <li key={el.course_id}>
              <CourseBar
                name={el.name}
                courseId={el.course_id}
                description={el.description}
                lessons={el.lesson_amount}
                cards={el.card_amount}
                forLearning={el.for_learning}
                repeats={el.for_repeating}
                awkwards={el.awkward_amount}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default CourseDetails;
