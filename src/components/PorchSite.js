import { useState } from "react";
import { Link } from "react-router-dom";

const PorchSite = () => {
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
