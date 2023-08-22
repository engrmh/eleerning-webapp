import React, {useEffect, useState} from "react";
import "./PopularCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseBox from "../CourseBox/CourseBox";

export default function PopularCourses() {
    const [preSellCourses, setPreSellCourses] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/presell`)
            .then(res => res.json())
            .then(data => setPreSellCourses(data))
    }, []);
    return (
        <>
            <div className="popular">
                <div className="container">
                    <SectionHeader title="محبوب ترین دوره ها" />
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
                                        preSellCourses.map((item , index) => (
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
