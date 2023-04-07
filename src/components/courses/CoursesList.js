import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ListElement from "./ListElement";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CourseDetails = ({ courses }) => {
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <ul>
        {courses.map((el) => {
          return (
            <li key={el.course_id}>
              <Link to={`/course/${el.course_id}`}>
                {/* element listy jako komponent */}
                <ListElement
                  name={el.name}
                  description={el.description}
                  lessons={el.lesson_amount}
                  cards={el.card_amount}
                  forLearning={el.for_learning}
                  repeats={el.for_repeating}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      {/* 
                            name
                            opis
                            lekcji w kursie
                            kart w kursie
                            do nauki
                            do powtórki

             */}
    </>
  );
};

export default CourseDetails;
