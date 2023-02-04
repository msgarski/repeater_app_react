import { useContext } from "react";
import LoggedInContext from "./contexts/LoggedInContext";
import { Link } from "react-router-dom";

const PorchSite = () => {
  const { accessData } = useContext(LoggedInContext);

  console.log("token i id: ", accessData.token, accessData.userId);
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
                <button>Wstecz czy wyloguj?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PorchSite;
