import react from "react";

const Home = () => {
  return (
    <div>
      <div id="title">
        <h1>Witaj w programie REPEATER</h1>
      </div>

      <img
        src="../images/owl_logo_orange.png"
        width="350"
        height="300"
        alt="owl logo"
      />

      <div>
        <div id="signin">
          {/* link to "/signin" page */}
          <button>Logowanie</button>
        </div>
        <div id="signup">
          {/* link to "/signup" page */}
          <button type="button">Nie mam jeszcze konta</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
