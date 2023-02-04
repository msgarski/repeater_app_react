// import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

const PorchSite = () => {
  const { token, userId, userLogOut } = useAuthentication();

  console.log("token i id: ", token, userId);

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>
        {/* if="isLoggedIn" */}
        <div>
          {/* v-if="!chooseCourse" */}
          <div>
            <div>
              <div>
                {/* <!-- <router-link :to="'/repeating/' + courseId"> --> */}
                {/* @click="setChooseCourse" */}
                <button>Krótkie powtórki</button>
              </div>
            </div>

            <div>
              <div>
                <button>Zadania na dzisiaj</button>
              </div>
              <div>
                <button>Przejdź do programu</button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Link to="../">
                <button onClick={userLogOut}>Wstecz czy wyloguj?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PorchSite;
