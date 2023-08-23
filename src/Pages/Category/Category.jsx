import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";

import "./Category.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";

export default function Category() {
  const [courses, setCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([])
  const [status, setStatus] = useState('default')
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض')
  const [searchValue, setSearchValue] = useState('')

  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
        .then((res) => res.json())
        .then((allCourses) => {
          setCourses(allCourses);
          setOrderedCourses(allCourses)
        });
  }, [categoryName]);

  useEffect(() => {
    switch(status) {
      case 'free': {
        const freeCourses = courses.filter(course => course.price === 0)
        setOrderedCourses(freeCourses)
        break
      }
      case 'money': {
        const notFreeCourses = courses.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break
      }
      case 'last': {
        setOrderedCourses(courses)
        break
      }
      case 'first': {
        const reversedCourses = courses.slice().reverse()
        setOrderedCourses(reversedCourses)
        break
      }
      default: {
        setOrderedCourses(courses)
      }
    }
  }, [status])

  const statusTitleChangeHandler = event => {
    setStatusTitle(event.target.textContent)
  }

  const SearchValueSearchHandler = event => {
    setSearchValue(event.target.value)
    const filteredCourse = courses.filter(course => course.name.includes(event.target.value))
    setOrderedCourses(filteredCourse)
  }

  return (
      <>
        <section className="courses">
          <div className="container">
            <div className="courses-content">
              <div className="container">
                <div className="row">
                  {courses.length === 0 ? (
                      <div className="alert alert-warning">
                        هنوز هیچ دوره‌ای برای این دسته بندی وجود ندارد
                      </div>
                  ) : (
                      <>
                        <div className="courses-top-bar">
                          <div className="courses-top-bar__right">
                            <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                              <i className="fas fa-border-all courses-top-bar__icon"></i>
                            </div>
                            <div className="courses-top-bar__column-btn">
                              <i className="fas fa-align-left courses-top-bar__icon"></i>
                            </div>

                            <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {/* مرتب سازی پیش فرض */}
                            {
                              statusTitle
                            }
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                              <ul className="courses-top-bar__selection-list">
                                <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active" onClick={(event) => {
                                  setStatus('مرتب سازی پیش فرض')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی پیش فرض
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('free')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی دوره های رایگان
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('money')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی دوره های پولی
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('last')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی بر اساس آخرین
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('first')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی بر اساس اولین
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('cheap')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی بر اساس ارزان ترین
                                </li>
                                <li className="courses-top-bar__selection-item" onClick={(event) => {
                                  setStatus('expensive')
                                  statusTitleChangeHandler(event)
                                }}>
                                  مرتب سازی بر اساس گران ترین
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="courses-top-bar__left">
                            <form action="#" className="courses-top-bar__form">
                              <input
                                  type="text"
                                  className="courses-top-bar__input"
                                  placeholder="جستجوی دوره ..."
                                  value={searchValue}
                                  onChange={SearchValueSearchHandler}
                              />
                              <i className="fas fa-search courses-top-bar__search-icon"></i>
                            </form>
                          </div>
                        </div>
                        {
                          shownCourses.length === 0 ? (
                              <div className='alert alert-warning'>هیچ دوره ای یافت نشد.</div>
                          ) : (
                              shownCourses.map((course) => (
                                  <CourseBox {...course} />
                              ))
                          )
                        }

                        <Pagination
                            items={orderedCourses}
                            itemsCount={3}
                            pathname={`/category-info/${categoryName}`}
                            setShownCourses={setShownCourses}
                        />
                      </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}
