import React from "react";
import LastCourses from "../../Components/LastCuorses/LastCourses";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import LastArticle from "../../Components/LastArticle/LastArticle";

export default function Index() {
  return (
    <>
      <LastCourses />
      <AboutUs/>
      <PopularCourses/>
      <PresellCourses/>
      <LastArticle/>
    </>
  );
}
