import { useParams } from "react-router-dom";

const RepeatPhase = () => {
  const { course_id } = useParams();
  console.log("course_id", course_id);
  return (
    <>
      <p>Tu robimy szybkie powtórki z Kursu nr: {course_id}</p>
    </>
  );
};

export default RepeatPhase;
