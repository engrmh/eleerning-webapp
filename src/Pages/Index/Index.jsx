import React from "react";
import Header from "../../Components/Header/Header";
import LastCourses from "../../Components/LastCuorses/LastCourses";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import LastArticle from "../../Components/LastArticle/LastArticle";
import Footer from "../../Components/Footer/Footer";

export default function Index() {
  return (
    <>
      <Header />
      <LastCourses />
      <AboutUs/>
      <PopularCourses/>
      <PresellCourses/>
      <LastArticle/>
      <Footer/>
    </>
  );
}
