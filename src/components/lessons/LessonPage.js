import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { lesson_id } = useParams();

  return (
    <>
      <div>
        <div>
          <h1>Temat lekcji: </h1>
        </div>
        <div>
          <div>
            <button>dodaj wiele kart</button>
            {/* <router-link :to="'/massimport/' + lessonId"> */}
          </div>
          <div>
            {/* <router-link :to="'/singleimport/' + lessonId"> */}
            <button>dodaj karty pojedynczo</button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <div>
              <label for="tryouts">Do nauki:</label>
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

        {/* <lesson-table :lessonId="lessonId"></lesson-table> */}

        <div>
          <button>Powrót do widoku kursu</button>
        </div>
      </div>
    </>
  );
};

export default LessonPage;
