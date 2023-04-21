import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";

const LearningNew = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Nauka nowych słów z kursu: {courseId}</h1>
        <h3>Limit dnia: , limit tury:</h3>

        <CustomButton onClickAction={() => navigate(-1)}>Powrót</CustomButton>

        <div>
          {/* v-if="learningEnding()" */}
          {/* <summary-phase></summary-phase> */}
        </div>
        <div>
          {/* v-else */}
          {/* <learn-present></learn-present> */}
        </div>
      </div>
    </>
  );
};
export default LearningNew;
