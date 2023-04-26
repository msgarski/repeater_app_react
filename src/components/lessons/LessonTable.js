const LessonTable = ({ lessonId }) => {
  console.log("lessonId z propsa: ", lessonId);
  // filteredCards() {
  //             return this.cards.filter(c => {
  //                 if(this.filter == '') return true;
  //                 return c.question.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
  //             })
  //         },
  //         sortedCards:function() {
  //             return this.filteredCards.slice(0).sort((a,b) => {
  //                 let modifier = 1;
  //                 if(this.currSortDir === 'desc') modifier = -1;
  //                 if(a[this.currSort] < b[this.currSort]) return -1 * modifier;
  //                 if(a[this.currSort] > b[this.currSort]) return 1 * modifier;
  //                 return 0;
  //             })
  //             .filter((row, index) => {
  //                 let start = (this.currPage-1)*this.pageDim;
  //                 let end = this.currPage*this.pageDim;
  //                 if(index >= start && index < end) return true;
  //             });
  //         }
  // deleteCard(cardId){
  //           console.log('usuń kartę', cardId)
  //          this.eraseCardFromDatabase(cardId)

  //       },
  //       editCard(cardId){
  //           let currCard = this.cards.find(card=>card.card_id==cardId)
  //           //console.log('bieżąca karta', currCard)
  //           this.$store.dispatch('card/setCurrCard', currCard)
  //           console.log('bież karta  ze stora: ', this.$store.getters['card/getCurrCard'])
  //           this.$router.push('/editcard/' + cardId)

  //       },
  // sort:function(sortingCol) {
  //           //if s == current sort, reverse
  //           if(sortingCol === this.currSort) {
  //           this.currSortDir = this.currSortDir==='asc'?'desc':'asc';
  //           }
  //           this.currSort = sortingCol;
  //       },
  //       prevPage:function() {
  //           if(this.currPage > 1) this.currPage--;
  //       },
  //       nextPage:function() {
  //           if((this.currPage*this.pageDim) < this.cards.length) this.currPage++;
  //       },
  //       backToPrevious: function(event){
  //           this.$router.go(-1);
  //       },

  // getCardsForLesson(){
  //           http.get('cards/fillLessonTable/' + this.lessonId)
  //           .then((result) => {
  //               this.cards = result.data;
  //               console.log('widok słów do lekcji z http: ', this.cards[0].answer);
  //           })
  //           .catch((error) => {
  //               this.errorMessage = error.message;
  //                   console.error("coś poszło nie tak...", error);
  //           });
  //       },
  //       eraseCardFromDatabase(cardId){
  //           http.get('cards/deleteCard/' + cardId)
  //           .then((result) => {

  //               console.log('widok słów do lekcji z http: ', result.data);
  //           })
  //           .then(()=>{
  //               this.getCardsForLesson()
  //           })
  //           .catch((error) => {
  //               this.errorMessage = error.message;
  //                   console.error("coś poszło nie tak...", error);
  //           });
  //       },

  return (
    <>
      <p>Lesson Table</p>
      <div>
        <div>
          <label>Wyszukaj</label>
          <input type="search" id="search" />
        </div>
        <table>
          {/* @click="sort('question')" */}
          <thead>
            <tr>
              <th>Pytanie</th>
              <th>Odpowiedź</th>
              <th>Powtórka</th>
              <th>Działania</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>card.question</td>
              <td>card.answer</td>
              <td>card.next_repeat</td>
              <td>
                <button>Usuń</button>

                <button>Edytuj</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          {/* @click="prevPage" class="button-t" */}
          <button>Poprzednia</button>
          {/* @click="nextPage" class="button-t" */}
          <button>Następna</button>
        </div>
      </div>
    </>
  );
};

export default LessonTable;
