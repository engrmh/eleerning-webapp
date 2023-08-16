import React, { useContext } from "react";
import "./CommentsTextArea.css";
import AuthContext from "../context/authContext";
import Pagination from "../Pagination/Pagination";
import {Link} from "react-router-dom";

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
          <Pagination />
        </>
      ) : (
        <div className="alert alert-warning">هنوز کامنتی ثبت نشده است</div>
      )}
      {authContext.isLoggedIn ? (
        <div className="">
          <span className="comments__title">دیدگاهتان را بنویسید</span>
          <span className="comments__text">
            <span>با عنوان {authContext.userInfos.name} وارد شده اید.</span>
            <a className='me-2' onClick={authContext.logout}>خارج میشوید؟ </a>
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
      ) : (
        <div className="alert alert-warning">برای ثبت کامنت باید
            <Link to='/login' className='me-2'>لاگین کنید</Link>
        </div>
      )}
    </div>
  );
}
