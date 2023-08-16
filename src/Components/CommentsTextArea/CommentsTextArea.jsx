import React, { useContext } from "react";
import "./CommentsTextArea.css";
import AuthContext from "../context/authContext";
import Pagination from "../Pagination/Pagination";

export default function CommentsTextArea({ comments }) {
  const authContext = useContext(AuthContext);
  return (
    <div className="comments">
      {comments.length ? (
        <>
          {comments.map((comment) => (
            <>
              <div className="comments__item">
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        فلانی
                      </span>
                      <span className="comments__question-status comment-status">
                        کاربر
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
            <Pagination/>
        </>
      ) : (
        <div className="aler alert-warning">هنوز کامنتی ثبت نشده است</div>
      )}

      <span className="comments__title">دیدگاهتان را بنویسید</span>
      <span className="comments__text">
        <span>با عنوان {authContext.userInfos.name} وارد شده اید.</span>
        <a href="#">خارج میشوید? </a>
        بخش های موردنیاز علامت گذاری شده اند *
      </span>
      <div className="comments_content">
        <span className="comments__content-title">دیدگاه *</span>
        <textarea className="comments__content-textarea"></textarea>
      </div>
      <button
        type="submit"
        className="comments__button"
        onClick={() => console.log("comment added")}
      >
        فرستادن دیدگاه
      </button>
    </div>
  );
}
