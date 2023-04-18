import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  API_URL,
  INITIAL_SINGLE_CARD_DATA_PACK,
} from "../../general/constants";
import useAuthentication from "../../hooks/useAuthentication";
import { useState } from "react";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const SingleImport = () => {
  console.clear();
  const { token, userId, setTokenContext } = useAuthentication();
  const navigate = useNavigate();
  const { lesson_id } = useParams();
  const [singleCard, setSingleCard] = useState(INITIAL_SINGLE_CARD_DATA_PACK);

  const handleInputFieldToHookObject = (event) => {
    setSingleCard({
      ...singleCard,
      [event.target.id]:
        event.target.type === "checkbox"
          ? !singleCard.priority
          : event.target.value,
    });
  };
  //******************************************************************************** */
  //  Http request method
  //******************************************************************************** */
  const pack = {
    lessonId: lesson_id,
    question: singleCard.question,
    answer: singleCard.answer,
    pronounciation: singleCard.pronounciation,
    sentence: singleCard.sentence,
    image: singleCard.image,
    priority: singleCard.priority,
    user_id: userId,
  };
  const addSingleCard = async () => {
    try {
      const response = await axios.post(API_URL + "/cards/createCard", pack, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response z dodania karty: ", response);
      setTokenContext(response.data);
      setSingleCard(INITIAL_SINGLE_CARD_DATA_PACK);
      console.log("token nowy: ", token);
      //todo redirecting???
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddCardForm = (event) => {
    console.log("singleCard wygląd zestawu: ", singleCard);
    event.preventDefault();
    addSingleCard();
  };
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <p>Import pojedynczej karty</p>

      <form onSubmit={handleAddCardForm}>
        <p>formularz dodania karty</p>
        <div>
          <InputField
            type="checkbox"
            id="priority"
            name="priority"
            title="Nauka priorytetowa"
            value={singleCard.priority}
            onChange={handleInputFieldToHookObject}
          />
        </div>

        <div>
          <InputField
            type="text"
            name="question"
            id="question"
            title="pytanie"
            value={singleCard.question}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <InputField
            type="text"
            name="answer"
            id="answer"
            title="Odpowiedź"
            value={singleCard.answer}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <InputField
            type="text"
            name="pronounciation"
            id="pronounciation"
            title="Wymowa"
            value={singleCard.pronounciation}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <TextareaField
            rows="3"
            cols="50"
            name="sentence"
            id="sentence"
            title="Przykład użycia"
            value={singleCard.sentence}
            onChange={handleInputFieldToHookObject}
          />
        </div>
        <div>
          <hr />
          <label>Dodaj obrazek</label>
          <input type="file" id="image" name="image" size="300" />
          <hr />
        </div>
        <button type="submit">dodaj kartę</button>
      </form>
      <button onClick={() => navigate(-1)}>Anuluj</button>
    </>
  );
};

export default SingleImport;
