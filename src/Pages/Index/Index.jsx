import React from "react";
import LastCourses from "../../Components/LastCuorses/LastCourses";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import LastArticle from "../../Components/LastArticle/LastArticle";
import Landing from "../../Components/Landing/Landing";

export default function Index() {
  return (
    <>
      <Landing/>
      <LastCourses />
      <AboutUs/>
      <PopularCourses/>
      <PresellCourses/>
      <LastArticle/>
    </>
  );
}
