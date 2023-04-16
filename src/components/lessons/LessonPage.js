import { useParams, useNavigate, Link } from "react-router-dom";
import LessonTable from "./LessonTable";

const LessonPage = () => {
  const { lesson_id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>
          <h1>Temat lekcji: </h1>
        </div>
        <div>
          <div>
            <Link to={`/massimport/${lesson_id}`}>
              <button>dodaj wiele kart</button>
            </Link>
          </div>
          <div>
            <Link to={`/singleimport/${lesson_id}`}>
              <button>dodaj karty pojedynczo</button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <div>
              <label>Do nauki:</label>
            </div>
            <div>
              <button>Ucz się</button>
            </div>
          </div>

          <div>
            <label>Do powtórki:</label>
            {/* <p>{{ lessonInfo.for_repeating }}</p> */}
            <button>Powtarzaj</button>
          </div>
        </div>
        <hr />
        <LessonTable lessonId={lesson_id} />
        <hr />
        <div>
          <button onClick={() => navigate(-1)}>Powrót do widoku kursu</button>
        </div>
      </div>
    </>
  );
};

export default LessonPage;
