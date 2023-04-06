import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//**************************************************************************** */
//  Main Block
//**************************************************************************** */
const CoursesList = ({ courses }) => {
  //*************************************************************************** */
  //  JSX code
  //*************************************************************************** */
  return (
    <>
      <ul>
        {courses.map((el) => {
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
      <div>
        {/* 
                            :key="course.course_id"
                            :courseId="course.course_id"
                            :name="course.name" 
                            :description="course.description">
             */}
      </div>
    </>
  );
};

export default CoursesList;
