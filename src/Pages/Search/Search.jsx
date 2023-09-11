import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Search() {
  const { value } = useParams();
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data[0]);
        setArticles(data[1]);
      });
  }, []);
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه دوره ها برای   جستجوی شما"
            desc="سکوی پرتاب شما به سمت موفقیت"
          />
          <div className="row">
            {courses.length === 0 ? (
              <div className="alert alert-warning">
                دوره ای برای جستجوی شما وجود ندارد
              </div>
            ) : (
              courses.map((course, index) => (
                <CourseBox {...course} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه مقالات برای جستجوی شما"
            desc="پیش یه سوی ارتقای دانش"
          />
          <div className="row">
            {articles.length === 0 ? (
              <div className="alert alert-warning">
                مقاله ای برای جستجوی شما وجود ندارد
              </div>
            ) : (
              articles.map((article, index) => (
                <ArticleBox {...article} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
