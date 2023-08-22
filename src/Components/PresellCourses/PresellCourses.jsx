import React, {useEffect, useState} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./PresellCourses.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseBox from "../CourseBox/CourseBox";


export default function PresellCourses() {
    const [popularCourses, setPopularCourses] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/popular`)
            .then(res => res.json())
            .then(data => setPopularCourses(data))
    }, []);
  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeader title="دوره های در حال پیش فروش" />
            <div className="courses-content">
                <div className="container">
                    <div className="row">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            loop={true}
                            className="mySwiper"
                        >
                            {
                                popularCourses.map((item , index) => (
                                    <SwiperSlide key={index}>
                                        <CourseBox {...item} isSlide={true}/>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
