import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  API_URL,
  INITIAL_SINGLE_CARD_DATA_PACK,
} from "../../general/constants";
import useAuthentication from "../../hooks/useAuthentication";
import { useState, useEffect, useRef } from "react";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";
import {
  checkProperStringLength,
  isStringExists,
} from "../../general/validators";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const SingleImport = () => {
  const submitButtonRef = useRef();
  const messageRef = useRef();
  const myRef = useRef();
  // console.clear();
  const { token, userId, setTokenContext } = useAuthentication();
  const navigate = useNavigate();
  const { lesson_id } = useParams();
  const [singleCard, setSingleCard] = useState(INITIAL_SINGLE_CARD_DATA_PACK);
  const [rerender, setRerender] = useState(false);

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
      setTokenContext(response.data);
      setSingleCard(INITIAL_SINGLE_CARD_DATA_PACK);
      setRerender(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddCardForm = (event) => {
    console.log("singleCard wygląd zestawu: ", singleCard);
    event.preventDefault();
    addSingleCard();
  };

  useEffect(() => {
    myRef.current.focus();
  }, [rerender]);

  useEffect(() => {
    submitButtonRef.current.disabled = !(
      isStringExists(singleCard.question) && isStringExists(singleCard.answer)
    );
  }, [singleCard.question, singleCard.answer]);

  const validateOnBlur = () => {
    !(singleCard.question && singleCard.answer)
      ? (messageRef.current.hidden = false)
      : (messageRef.current.hidden = true);
  };
  // useEffect(() => {
  //   submitButtonRef.current.disabled = !isStringExists(newLesson.name);
  //   newLesson.name
  //     ? (messageRef.current.hidden = checkProperStringLength(
  //         newLesson.name,
  //         3,
  //         50
  //       ))
  //     : (messageRef.current.hidden = true);

  //   checkProperStringLength(newLesson.description, 0, 200);
  // }, [newLesson.name, newLesson.description]);
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
            type="text"
            name="question"
            id="question"
            title="pytanie"
            value={singleCard.question}
            onChange={handleInputFieldToHookObject}
            ref={myRef}
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
            actionOnBlur={validateOnBlur}
          />
        </div>
        <p ref={messageRef} hidden>
          Pytanie i odpowiedź nie mogą być puste
        </p>
        <div>
          <InputField
            type="text"
            name="pronounciation"
            id="pronounciation"
            title="Wymowa"
            value={singleCard.pronounciation}
            onChange={handleInputFieldToHookObject}
            actionOnBlur={validateOnBlur}
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
          <hr />
          <label>Dodaj obrazek</label>
          <input type="file" id="image" name="image" size="300" />
          <hr />
        </div>
        <button type="submit" ref={submitButtonRef} disabled>
          dodaj kartę
        </button>
      </form>
      <button onClick={() => navigate(-1)}>Anuluj</button>
    </>
  );
};

export default SingleImport;
