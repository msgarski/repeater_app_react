import { Link } from "react-router-dom";

const LessonBar = ({ name, lessonId }) => {
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
      <hr />
    </>
  );
};

export default LessonBar;
