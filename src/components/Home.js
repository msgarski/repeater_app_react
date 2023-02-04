// import react from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

const Home = () => {
  const { token, userId, userLogOut } = useAuthentication();

  console.log("token i id: ", token, userId);

  //****************************************************************** */
  // JSX code
  //****************************************************************** */
  return (
    <div>
      <div id="title">
        <h1>Witaj w programie REPEATER</h1>
      </div>
      <figure>
        <img
          src={require("../images/owl_logo_orange.png")}
          width="350"
          height="300"
          alt="owl logo"
        />
      </figure>

      <div>
        <div id="signin">
          <Link to="/signin">
            <button>Logowanie</button>
          </Link>
        </div>
        <div id="signup">
          <Link to="/signup">
            <button type="button">Nie mam jeszcze konta</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
