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

      console.log("response.data: ", response.data.newToken);

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
            {repeatsList.map((el) => {
              return (
                <li key={el.course_id}>
                  <Link to={`/repeatphase/${el.course_id}`}>
                    <div>{el.name}</div>
                    <div>
                      {el.repeats} powtórek w kursie: {el.course_id}
                    </div>
                  </Link>
                </li>
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
