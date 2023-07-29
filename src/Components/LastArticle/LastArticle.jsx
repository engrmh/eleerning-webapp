import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./LastArticle.css";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticle() {
  return (
    <>
      <section className="articles">
        <div className="container">
          <SectionHeader
            title="جدیدترین مقاله ها"
            desc="پیش به سوی ارتقای دانش"
            btnTitle="تمامی مقاله ها"
          />

          <div class="articles__content">
            <div class="row">
              <ArticleBox
                cover="images/blog/3.jpg"
                title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
                desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
              />
              <ArticleBox
                cover="images/blog/3.jpg"
                title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
                desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
              />
              <ArticleBox
                cover="images/blog/3.jpg"
                title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
                desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
