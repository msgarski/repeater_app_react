// import { http } from "../../general/axios";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../general/constants";

const SignIn = () => {
  let errorCode = null;

  // object for received form data
  const pack = {
    email: "msgarski@gmail.com",
    password: "tofik1",
    token: null,
    expiresIn: null,
  };

  const sendCredentials = async () => {
    try {
      const response = await axios.post(API_URL + "/login/entering", pack);
      console.clear();

      console.log("response :>> ", response.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  // blocking form's button from reloading the page
  // and executing http request with form's data
  const handleSubmit = (event) => {
    event.preventDefault();
    // todo obsluga http requesta
    sendCredentials();
    // todo wstawienie tokena w store albo w localstorage
    // todo wstawienie faktu zalogowania w store lub contexie
    // todo wstawienie userId do stora
    // todo wyczyszczenie pól w formularzu, zwlaszcza password
    // todo po udanym zalogowaniu, przekierować usera do PorchSite
  };

  //       http
  //         .post("/login/entering", pack)
  //         .then((response) => {
  //
  //           this.password = "";
  //           this.token = response.data.token;
  //           localStorage.setItem("token", this.token);
  //           this.$store.dispatch("setUserId", response.data.userId);
  //           this.$store.dispatch("login");
  //
  //           this.$store.dispatch("setTodayDate");
  //         })
  //
  //
  //         .catch((error) => {
  //           switch (error.response.status) {
  //             case 403:
  //               this.errorCode = 403; // not getting here
  //               break;
  //             case 404:
  //               this.errorCode = 404; // or here
  //               break;
  //             case 401:
  //               this.errorCode = 401; // or here
  //               break;
  //             default:
  //               console.log("some other error"); // end up here all the time
  //               break;
  //           }
  //         });
  //     },

  return (
    <>
      <h1 id="title">Logowanie</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* //todo insert reusable components instead of below: */}
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">Zatwierdź</button>
        </form>
        {/* if "errorCode == 404" */}
        <div>
          <p>Nie ma usera</p>
        </div>
        {/* if "errorCode == 401" */}
        <div>
          <p>Błąd logowania</p>
        </div>
        {/* if "errorCode == 403" */}
        <div>
          <p>Konto nieaktywne</p>
        </div>
      </div>
      <div>
        <div>
          <Link to="/">
            {/* buttony tez reusable */}
            <button>Cofnij</button>
          </Link>
        </div>

        <div>
          <Link to="/forgot">
            <button>Odzyskiwanie konta</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
