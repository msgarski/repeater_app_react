import { useParams } from "react-router-dom";

const LessonInterior = () => {
  const { lesson_id } = useParams();

  return (
    <>
      <p>LessonInterior of lesson nr: {lesson_id}</p>
    </>
  );
};

export default LessonInterior;
