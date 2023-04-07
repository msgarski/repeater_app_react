import { useNavigate } from "react-router-dom";

const NewLesson = () => {
  const navigate = useNavigate();

  return (
    <>
      <p>NewLesson</p>
      <button onClick={() => navigate(-1)}>Powrót</button>
    </>
  );
};

export default NewLesson;
