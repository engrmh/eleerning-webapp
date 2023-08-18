import React, {useState , useEffect} from "react";
import "./LastCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

export default function LastCourses() {
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
        .then(res =>  res.json())
        .then(data => setAllCourses(data))
  }, []);



  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  allCourses.splice(0 , 6).map((course , index) => (
                      <CourseBox {...course} key={index}/>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
