const PorchSite = () => {
  return (
    <>
      <div>
        {/* if="isLoggedIn" */}
        <div>
          {/* v-if="!chooseCourse" */}
          <div>
            <div>
              <div className="btn">
                {/* <!-- <router-link :to="'/repeating/' + courseId"> --> */}
                {/* @click="setChooseCourse" */}
                <button className="button">Krótkie powtórki</button>
              </div>
            </div>

            <div>
              <div className="btn">
                <button className="button-1">Zadania na dzisiaj</button>
              </div>
              <div className="btn">
                {/* <router-link to="/mainscreen">
                  <button class="button">Przejdź do programu</button>
                </router-link> */}
              </div>
            </div>
          </div>
          <div>
            <div>
              <button>Wstecz</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
