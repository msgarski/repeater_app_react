import { Link } from "react-router-dom";
import { useEffect, usestate, useRef } from "react";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";
import { setAuthTokenHeader } from "../general/axiosMethods";
import { API_URL } from "../general/constants";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const { token, userId } = useAuthentication();

  // todo set boolean value of list of repeats existing

  // todo according to above, display or hide button on the site

  // todo implement action for fastRepeats button

  console.log("token i id w porchSite: ", token, userId);

  //**************************************************************************** */
  //  Http requests
  //**************************************************************************** */
  const getNumOfRepeatCards = async () => {
    try {
      const url = "/repeatQueries/getRepeatsNumsForCourses/" + userId;
      const response = await axios.get(API_URL + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response.data: ", response.data);
      // sending list to redux
    } catch (error) {
      console.error(
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
        <Link to="/mainscreen">
          <button>Przejdź do programu</button>
        </Link>
      </div>
    </>
  );
};

export default PorchSite;
