import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { API_URL, INITIAL_MASS_CARDS_DATA_PACK } from "../../general/constants";
import TextareaField from "../forms/TextareaField";
import InputField from "../forms/InputField";
import { useState } from "react";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MassImport = () => {
  const { token, userId, setTokenContext } = useAuthentication();
  const [cardsInput, setCardsInput] = useState(INITIAL_MASS_CARDS_DATA_PACK);
  const navigate = useNavigate();
  const { lesson_id } = useParams();

  const handleInputFieldToHookObject = (event) => {
    setCardsInput({
      ...cardsInput,
      [event.target.id]:
        event.target.type === "checkbox"
          ? !cardsInput.priority
          : event.target.value,
    });
  };
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const cardsPack = {
    cardsInput: cardsInput.cardsInput,
    priority: cardsInput.priority,
    lesson_id: lesson_id,
    user_id: userId,
  };

  const addManyCards = async () => {
    try {
      const response = await axios.post(
        API_URL + "/cards/createManyCards",
        cardsPack,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response);
      setTokenContext(response.data);
      setCardsInput(INITIAL_MASS_CARDS_DATA_PACK);
    } catch (error) {
      console.log("error from massImporting", error.message);
    }
  };

  const handleMassImportForm = (event) => {
    event.preventDefault();
    // console.log("cardsInput wygląd zestawu: ", cardsInput);
    addManyCards();
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <p>Import wielu kart</p>
      <div>
        <p>Wprowadź listę słów:</p>
        <form onSubmit={handleMassImportForm}>
          <div>
            <div>
              <InputField
                type="checkbox"
                id="priority"
                name="priority"
                title="Nauka priorytetowa"
                onChange={handleInputFieldToHookObject}
                value={cardsInput.priority}
              />
            </div>
          </div>
          <div>
            <TextareaField
              rows="16"
              cols="300"
              name="cardsInput"
              id="cardsInput"
              placeholder="pytanie odpowiedź [wymowa] [zdanie przykładowe]"
              onChange={handleInputFieldToHookObject}
              value={cardsInput.cardsInput}
            />
          </div>

          {/* <div>
            <InputField
              type="checkbox"
              name="reckon"
              id="reckon"
              title="wykrywaj znaki rozdzielające"
              checked
            />
            <InputField type="hidden" name="lesson_id" id="lesson_id" />
          </div> */}
          <div>
            <button type="submit">Zapisz</button>
          </div>
        </form>
      </div>
      <button onClick={() => navigate(-1)}>Anuluj</button>

      <div>Import kart zakończony sukcesem</div>
    </>
  );
};

export default MassImport;
