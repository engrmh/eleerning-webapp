import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import AboutUsBox from "../AboutUsBox/AboutUsBox";

export default function AboutUs() {
  return (
    <>
      <div class="about-us">
        <div class="container">
          <SectionHeader
            title={"ما چه کمکی بهتون میکنیم؟"}
            desc={"از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"}
          />

          <div class="container">
            <div class="row">
              <AboutUsBox
                icon={"far fa-copyright"}
                title={"دوره های اختصاصی"}
                desc={"با پشتیبانی و کیفیت بالا ارائه میده !"}
              />
              <AboutUsBox
                icon={"fas fa-leaf"}
                title={"اجازه تدریس"}
                desc={"به هر مدرسی رو نمیده. چون کیفیت براش مهمه !"}
              />
              <AboutUsBox
                icon={"fas fa-gem"}
                title={"دوره پولی و رایگان"}
                desc={
                  "براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده"
                }
              />
              <AboutUsBox
                icon={"fas fa-crown"}
                title={"اهمیت به کاربر"}
                desc={
                  "اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
