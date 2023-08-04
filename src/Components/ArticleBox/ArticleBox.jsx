import React, { useState } from "react";
import "./ArticleBox.css";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

export default function ArticleBox({ title, desc, cover }) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoader = () => setIsImgShow(true);
  const onImageError = () => {
    alert("Error In Loading Image");
  };
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <a href="#" className="article-card__link-img">
            <img
              src={cover}
              className="article-card__img"
              alt="Article Cover"
              onLoad={() => onImageLoader()}
              onError={() => onImageError()}
            />
            {!isImgShow && <CircleSpinner />}
          </a>
        </div>
        <div className="article-card__content">
          <a href="#" className="article-card__link">
            {title}
          </a>
          <p className="article-card__text">{desc}</p>
          <a href="#" className="article-card__btn">
            بیشتر بخوانید
          </a>
        </div>
      </div>
    </div>
  );
}
