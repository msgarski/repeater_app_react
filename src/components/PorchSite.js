import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { shouldWeUpdateContextJWT } from "../general/axiosMethods";
import { API_URL } from "../general/constants";

import { addListCoursesWithRepeats } from "../store/slices/fastRepeatsSlice";
import { useDispatch } from "react-redux";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const dispatch = useDispatch();

  const { token, userId, setTokenContext } = useAuthentication();
  const [courseList, setCourseList] = useState([]);
  const firstTimeRef = useRef(true);

  // const [errorCode, setErrorCode] = useState(null);

  // todo set boolean value of list of repeats existing

  // todo according to above, display or hide button on the site

  // todo implement action for fastRepeats button

  //**************************************************************************** */
  //  Http requests
  //**************************************************************************** */
  const getNumOfRepeatCards = async () => {
    try {
      const url = "/repeatQueries/getRepeatsNumsForCourses/" + userId;
      const response = await axios.get(API_URL + url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response.data: ", response.data.payload);

      setCourseList(response.data.payload);

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
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      console.log("znowu");
    } else {
      console.log("courseList", courseList);
      dispatch(addListCoursesWithRepeats(courseList));
    }
  }, [courseList, dispatch]);

  useEffect(() => {
    getNumOfRepeatCards();
  }, []);

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        {/* router-link :to="'/repeating/' + courseId" */}

        <button disabled>Powtórki na dowolną chwilę...</button>
      </div>
      <div>
        <button disabled>Coś nie może już czekać...</button>
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
