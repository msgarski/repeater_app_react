import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../general/constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//************************************************************************ */
// Function component
//************************************************************************ */
const AccuntActivation = () => {
  const { activationToken } = useParams();
  const navigate = useNavigate();
  const [userActivationState, setUserActivationState] = useState(false);
  //*************************************************************************** */
  // Http request
  //*************************************************************************** */
  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.post(
          API_URL + "/signup/activate/" + activationToken
        );
        console.log(response);
        setUserActivationState(true);
      } catch (error) {
        console.error(
          "coś poszło nie tak podczas aktywacji konta użytkownika...",
          error.message
        );
      }
    };
    activateAccount();
  });
  //**************************************************************************** */
  // JSX code section
  //**************************************************************************** */
  return (
    <>
      <div>Aktywacja konta</div>
      {userActivationState ? (
        <div>
          <p>Twoje konto jest już aktywne</p>
          <p>Możesz się zalogować</p>
          <div>
            <button onClick={() => navigate("/signin")}>Logowanie</button>
          </div>
        </div>
      ) : (
        <h1>Czekamy...</h1>
      )}
    </>
  );
};
export default AccuntActivation;
