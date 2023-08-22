import React, {useEffect, useState} from "react";
import "./Articles.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Pagination from "../../Components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Articles() {
  const {page} = useParams()
    const [articles, setArticles] = useState([])
    const [shownArticles, setShownArticles] = useState()
    console.log(shownArticles)

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
        .then(res => res.json())
        .then(data => setArticles(data))
  },[page])
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                    articles.length && shownArticles.map((course , index) => (
                      <ArticleBox {...course} key={index}/>
                  ))
                }
              </div>
            </div>
          </div>
          <Pagination
            items={articles}
            itemsCount={3}
            pathName='/articles'
            setShownItems={setShownArticles}
          />
        </div>
      </section>
    </>
  );
}
