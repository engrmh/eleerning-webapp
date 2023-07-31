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
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <a href="#" class="article-card__link-img">
            <img
              src={cover}
              class="article-card__img"
              alt="Article Cover"
              onLoad={() => onImageLoader()}
              onError={() => onImageError()}
            />
            {!isImgShow && <CircleSpinner />}
          </a>
        </div>
        <div class="article-card__content">
          <a href="#" class="article-card__link">
            {title}
          </a>
          <p class="article-card__text">{desc}</p>
          <a href="#" class="article-card__btn">
            بیشتر بخوانید
          </a>
        </div>
      </div>
    </div>
  );
}
