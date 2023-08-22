import React, {useEffect, useState} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./LastArticle.css";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticle() {
  const [article, setArticle] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
        .then(res => res.json())
        .then(data => setArticle(data))
  }, []);
  return (
    <>
      <section className="articles">
        <div className="container">
          <SectionHeader
            title="جدیدترین مقاله ها"
            desc="پیش به سوی ارتقای دانش"
            btnTitle="تمامی مقاله ها"
            btnHref='articles/1'
          />

          <div className="articles__content">
            <div className="row">
              {
                article.slice(0,3).map((item , index) => (
                    <ArticleBox {...item} key={index}/>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
