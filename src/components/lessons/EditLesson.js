import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import InputField from "../forms/InputField";
import TextareaField from "../forms/TextareaField";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const EditLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <h3>Edycja lekcji</h3>
      </div>
      <form>
        <div>
          <InputField
            type="text"
            title="Zmień temat lekcji"
            name="name"
            id="name"
          />
        </div>
        <div>
          <label>Zmień opis lekcji</label>
          <TextareaField
            rows="5"
            cols="50"
            id="description"
            name="description"
            placeholder="Tematyka lekcji..."
          />
        </div>
        <div>
          <button>Zatwierdź zmiany</button>
        </div>
      </form>
      <div>
        <CustomButton onClickAction={() => navigate(-1)}>Anuluj</CustomButton>
      </div>
    </>
  );
};
export default EditLesson;
