import React, { useState } from "react";
import "./CourseBox.css";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import {Link} from "react-router-dom";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoader = () => setIsImgShow(true);
  // const onImageError = () => {
  //   alert("Error In Loading Image");
  // };

  return (
    <div className={props.isSlide ? 'col-4 w-100' : 'col-4'}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            // src={`/images/courses/${props.cover}`}
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt={props.shortName}
            className="course-box__img"
            onLoad={() => onImageLoader()}
            // onError={() => onImageError()}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${props.shortName}`} className="course-box__title">
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {props.creator}
              </a>
            </div>
            <div className="course-box__rating">
              <img
                src="/images/svgs/star.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">500</span>
            </div>
            <span className="course-box__price">{
              props.price === 0 ? 'رایگان' : Number(props.price).toLocaleString()
            }</span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${props.shortName}`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
