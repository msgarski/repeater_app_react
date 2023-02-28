import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const MainScreen = () => {
  const { token, userId } = useAuthentication();

  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <div>Ekran główny</div>

      <div>
        <Link to="newcourse">
          <button>Dodaj kurs</button>
        </Link>
      </div>
      <div>
        {/* <router-link to="/settings"> */}
        <Link to="mainoptions">
          <button>Opcje główne</button>
        </Link>
      </div>
      <div>
        <div>
          <p>Twoje kursy:</p>
        </div>
        <div>Oczekujące testy</div>

        <div>Powtórki na dziś</div>
      </div>

      <div>
        {/* <div v-if="coursesAreLoaded"> 
                <ul v-if="coursesInfoAreLoaded">
                    <user-course 
                        v-for="course in courses" 
                            :key="course.course_id"
                            :courseId="course.course_id"
                            :name="course.name" 
                            :description="course.description">
                    </user-course>
                </ul>
                <div v-else-if="!coursesInfoAreLoaded"><h1>Loading ...</h1></div>
                <div v-else-if="courses.length == 0">Nie masz żadnych kursów, <router-link to="/newcourse">Dodaj jakiś kurs</router-link></div>
            </div> */}
        {/* <div v-else-if="!coursesAreLoaded">
                    <h1>Loading...</h1>
            </div>
            <div > */}
        {/* <button @click="backToPrevious" class="button">Powrót</button> */}
      </div>
    </>
  );
};

export default MainScreen;

// import UserCourse from './course/UserCourse.vue'
// import http from '../plugins/axios.js'

// export default {
//     name: 'MainScreen',
//     components: {
//         'user-course': UserCourse
//     },
//     data(){
//         return{
//             courses     : null,
//             coursesInfo : null,
//             userId      : this.$store.getters.getUserId,
//             toCourse    : null,
//             coursesAreLoaded    :   false,
//             coursesInfoAreLoaded    :   false
//         };
//     },
//     created(){
//         this.getCoursesFullInfo();
//     },
//     mounted(){

//         const url = "/course/getallcoursesforuser/" + this.userId;

//         http.get(url)
//         .then(response => {
//             this.courses = response.data
//             console.log('dane po odebraniu w mainscreenie: ', response.data)
//         })
//         .then(()=>{
//             this.coursesAreLoaded = true;

//         })
//         .catch(error => {
//             this.errorMessage = error.message;
//             console.error("coś poszło nie tak...", error);
//         });

//     },
//     methods: {
//         backToPrevious: function(event){
//             this.$router.push('/porch');
//            // alert('nic się nie stało')
//         },
//         getCoursesFullInfo(){
//             const url = "/courseQueries/getFullInfoOfUserCourses/" + this.userId;

//             http.get(url)
//             .then(response => {
//                 this.$store.dispatch('course/setAllCourses', response.data);
//                 console.log('dane z requesta:', response.data)
//                 let sto = this.$store.getters['course/getCourseInfoById']

//                 console.log('ze stora na koniec wypeniania pasków kursów:', sto.find(el=>el.course_id == 1))

//             })
//             .then(()=>{
//                 //this.getLessonsFullInfo();
//                 this.coursesInfoAreLoaded = true;
//             })
//             .catch(error => {
//                 this.errorMessage = error.message;
//                 console.error("coś poszło nie tak...", error);
//             });
//         },

//     }
// }
