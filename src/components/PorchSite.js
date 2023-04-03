import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { shouldWeUpdateContextJWT } from "../general/axiosMethods";
import { API_URL } from "../general/constants";

import { addListCoursesWithRepeatsNums } from "../store/slices/fastRepeatsSlice";
import { useDispatch, useSelector } from "react-redux";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const PorchSite = () => {
  const dispatch = useDispatch();
  const repeatsList = useSelector((state) => {
    return state.repeats;
  });

  const { token, userId, setTokenContext } = useAuthentication();
  const [courseList, setCourseList] = useState([]);
  const firstTimeRef = useRef(true);
  const [showRepeats, setShowRepeats] = useState(false);

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

      // constant part of every http request:
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
    console.clear();
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
    } else {
      dispatch(addListCoursesWithRepeatsNums(courseList));
      console.log("state repeats", repeatsList);
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
      {!showRepeats ? (
        <div>
          <div>
            <button
              disabled={!repeatsList}
              onClick={() => setShowRepeats(true)}
            >
              Powtórki na dowolną chwilę...
            </button>
          </div>
          <div>
            <button disabled={true}>Coś nie może już czekać...</button>
          </div>
          <div>
            <Link to="/mainscreen">
              <button>Przejdź do programu</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Lista kursów z powtórkami</p>

          <ul>
            {/* router-link :to="'/repeating/' + courseId" ale w vue tam jest pusto...*/}

            {repeatsList.map((el) => {
              return (
                <Link to={`/repeatphase/${el.course_id}`}>
                  <li key={el.course_id}>
                    <div>{el.name}</div>
                    <div>
                      {el.repeats} powtórek w kursie: {el.course_id}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
          <button onClick={() => setShowRepeats(false)}>Powrót</button>
        </div>
      )}
    </>
  );
};

export default PorchSite;
