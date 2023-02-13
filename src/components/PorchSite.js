import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const { token, userId, userLogOut } = useAuthentication();

  console.log("token i id: ", token, userId);

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        <button>Powtórki na szybko...</button>
      </div>
      <div>
        <button>Zadania na dzisiaj</button>
      </div>
      <div>
        <button>Przejdź do programu</button>
      </div>
      <div>
        <Link to="../">
          <button type="button" onClick={userLogOut}>
            Wyloguj
          </button>
        </Link>
      </div>
    </>
  );
};

export default PorchSite;
