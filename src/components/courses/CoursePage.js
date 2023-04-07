import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CoursePage = () => {
  const { course_id } = useParams();
  const courses = useSelector((state) => {
    return state.courses;
  });
  const course = courses.find((el) => el.course_id === course_id);
  console.clear();
  console.log("course", course);
  const navigate = useNavigate();

  return (
    <>
      <div>
        Strona kursu: {course_id} czy na pewno? : {course.name}
      </div>
      <section></section>
      <button onClick={() => navigate(-1)}>Powrót</button>
    </>
  );
};
export default CoursePage;
