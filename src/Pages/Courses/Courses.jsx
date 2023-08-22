import React, {useEffect, useState} from "react";
import "./Courses.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import {useParams} from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const {page} = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
        .then(res => res.json())
        .then(data => setCourses(data))
  },[page])
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses/1",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  shownCourses.map((course , index) => (
                      <CourseBox {...course} key={index}/>
                  ))
                }
              </div>
            </div>
          </div>
          <Pagination
            items={courses}
            itemsCount={3}
            pathName='/courses'
            setShownItems={setShownCourses}
          />
        </div>
      </section>
    </>
  );
}
