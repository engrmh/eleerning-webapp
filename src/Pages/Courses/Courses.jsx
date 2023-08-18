import React, {useEffect, useState} from "react";
import "./Courses.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";

export default function Courses() {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
        .then(res => res.json())
        .then(data => setCourses(data))
  })
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  courses.map(course => (
                      <CourseBox {...course}/>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="courses-pagination">
            <ul className="courses__pagination-list">
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                </a>
              </li>
              <li className="courses__pagination-item">
                <a
                  href="#"
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  1
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  2
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
