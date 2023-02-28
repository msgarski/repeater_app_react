import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const { token, userId } = useAuthentication();

  console.log("token i id: ", token, userId);

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        {/* router-link :to="'/repeating/' + courseId" */}
        {/* @click="setChooseCourse, czyli: getBatchForRepeat()" */}
        {/* nieuzywane przyciski nie powinny być wogóle widoczne na stronie */}
        <button disabled>Powtórki na szybko...</button>
      </div>
      <div>
        {/* nie opracowano akcji */}
        <button disabled>Zadania na dzisiaj</button>
      </div>
      <div>
        {/* router-link to="/mainscreen" */}
        <Link to="mainscreen">
          <button>Przejdź do programu</button>
        </Link>
      </div>
    </>
  );
};

export default PorchSite;
