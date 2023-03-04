import useAuthentication from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const NewCourse = () => {
  const { token, userId } = useAuthentication();

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      {/* <div>Użytkownik jast zalogowany? {{ isLoggedIn }}</div> */}
      <div>
        <h3>Tworzenie nowego kursu</h3>
      </div>
      <form>
        <div>
          <label htmlFor="name">Nazwa</label>
          <input type="text" name="name" id="name" />
        </div>

        <div>
          <label htmlFor="description">Opis</label>
          <textarea
            rows="5"
            cols="50"
            id="description"
            name="description"
            placeholder="Tematyka kursu..."
          ></textarea>
        </div>

        {/* <div>
                <label >Rodzaj</label>
                <select name="genre"  id="genre">
                    <option selected value="private">Prywatny</option>
                    <option value="public">Publiczny</option>
                </select>
            </div> */}

        <div>
          <div>
            <button type="button">Dodaj kurs</button>
          </div>
        </div>
      </form>

      <div>
        <Link to="/mainscreen">
          <button>Anuluj</button>
        </Link>
      </div>
    </>
  );
};
export default NewCourse;
