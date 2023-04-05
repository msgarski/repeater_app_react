import { useParams, useNavigate } from "react-router-dom";

const RepeatPhase = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  //   console.log("course_id", course_id);
  return (
    <>
      <p>Tu robimy szybkie powtórki z Kursu nr: {course_id}</p>

      <button onClick={() => navigate(-1)}>Powrót</button>
    </>
  );
};

export default RepeatPhase;
