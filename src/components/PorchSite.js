import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { shouldWeUpdateContextJWT } from "../general/axiosMethods";
import { API_URL } from "../general/constants";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const { token, userId, setTokenContext } = useAuthentication();
  const [errorCode, setErrorCode] = useState(null);

  // todo set boolean value of list of repeats existing

  // todo according to above, display or hide button on the site

  // todo implement action for fastRepeats button

  // console.log("token i id w porchSite: ", token, userId);

  const listCoursesWithRepeats = () => {
    //
  };

  //**************************************************************************** */
  //  Http requests
  //**************************************************************************** */
  const getNumOfRepeatCards = async () => {
    try {
      const url = "/repeatQueries/getRepeatsNumsForCourses/" + userId;
      const response = await axios.get(API_URL + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response.data: ", response);

      let result = shouldWeUpdateContextJWT(response, token);
      if (result) {
        setTokenContext(response.data.newToken);
      }
    } catch (error) {
      console.error(
        //! zrobić wspólne reagowanie na różne kody błędów
        "coś poszło nie tak w getNumOfRepeatCards...",
        error.response.status
      );
    }
  };

  useEffect(() => {
    getNumOfRepeatCards();
  });
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        {/* router-link :to="'/repeating/' + courseId" */}

        <button disabled onClick={listCoursesWithRepeats}>
          Powtórki na dowolną chwilę...
        </button>
      </div>
      <div>
        <button disabled>Coś, co nie może już czekać...</button>
      </div>
      <div>
        <Link to="/mainscreen">
          <button>Przejdź do programu</button>
        </Link>
      </div>
    </>
  );
};

export default PorchSite;
