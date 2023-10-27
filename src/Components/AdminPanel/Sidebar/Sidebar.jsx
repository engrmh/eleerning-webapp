import React, { useContext } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutAdmin = (e) => {
    e.preventDefault();
    swal({
      title: "برای خروج مطمئن هستید؟",
      icon: "warning",
      buttons: ["اشتباه شد", "بله"],
    }).then((res) => {
      if (res) {
        swal({
          title: "خروج موفق",
          icon: "success",
          button: "متوجه شدم",
        }).then(() => {
          authContext.logout();
          navigate("/");
        });
      } else {
        swal({
          title: "لغو عملیات خروج",
          icon: "info",
          button: "متوجه شدم",
        });
      }
    });
  };
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li onClick={(e) => logOutAdmin(e)}>
            <Link to="#">
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
