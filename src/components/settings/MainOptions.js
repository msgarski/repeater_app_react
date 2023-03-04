import useAuthentication from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";
import axios from "axios";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainOptions = () => {
  const { token, userId } = useAuthentication();
  //! w created trzeba pobrać limity ze store'a i wpisać do zmiennych w optionTable dla usera
  const optionTable = {
    learningLimitsTable: [5, 10, 20, 40, 60, 80, 100, 150, 200],
    learningAmountBatch: [5, 10, 15, 20, 25, 30, 35, 40],
    repeatLimitsTable: [
      20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450,
      500,
    ],
    learningLimit: "",
    learningBatchLimit: "",
    repeatLimit: "",
    fastRepeatBatch: "",
    overlearning: true,
    imie: "", // to na próbę
  };
  // zbiór danych do wysłania do bazy danych
  const pack = {
    learningBatch: "",
    learningLim: "",
    repeatLim: "",
    fastRepeatBatch: "",
    overlearn: "",
    expires_in: null,
    userId: "",
    token: "",
  };
  //******************************************************************************** */
  //  sending http request method
  //******************************************************************************** */
  const addChanges = async () => {
    try {
      const response = await axios.post("/options/updateOptions", pack);
      console.log("odpowiedź serwera: ", response.data);

      // todo ustawienie nowych wartości w storze:
      // todo przekierowanie do mainscreen
    } catch (error) {
      console.error("coś poszło nie tak...", error);
    }
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <div>
          <h3>Opcje główne</h3>
        </div>
        <form>
          <div>
            <label htmlFor="learningBatchLimit">
              Limit słów do nauki w jednej serii
            </label>
            <select name="learningBatchLimit" id="learningBatchLimit">
              <option>{/* // {{limit}} */}</option>
            </select>
          </div>

          <div>
            <label htmlFor="learningLimit">Limit słów do nauki dziennej</label>
            <select name="learningLimit" id="learningLimit">
              <option>{/* {{limit}} */}</option>
            </select>
          </div>

          <div>
            <label htmlFor="repeatLimit">Limit dzienny powtórek</label>
            <select name="repeatLimit" id="repeatLimit">
              <option>{/* {{limit}} */}</option>
            </select>
          </div>
          <div>
            <label htmlFor="fastRepeatBatch">
              Rozmiar partii szybkich powtórek
            </label>
            <select name="fastRepeatBatch" id="fastRepeatBatch">
              <option>{/* {{limit}} */}</option>
            </select>
          </div>
          <div>
            <label htmlFor="overlearning">Przeuczenie w fazie nauki</label>
            <input type="checkbox" id="overlearning" name="overlearning" />
          </div>

          <div>
            <label htmlFor="overlearning">Odpytywanie odwrotne</label>
            <input type="checkbox" id="overlearning" />
          </div>

          <div>
            <button class="button">Zatwierdź zmiany</button>
          </div>
        </form>
        <div>
          <Link to="/mainscreen">
            <button>Anuluj</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainOptions;
