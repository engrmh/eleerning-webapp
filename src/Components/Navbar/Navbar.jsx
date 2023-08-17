import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

import "./Navbar.css";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const [allMenus, setAllMenus] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(menus => setAllMenus(menus))
  }, []);
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  صفحه اصلی
                </a>
              </li>

              {
                allMenus.map((menu , index) => (
                    <li className="main-header__item" key={index}>
                      <Link to={menu.href} className="main-header__link">
                        {menu.title}
                        {
                          menu.submenus.length !== 0 && (
                                <>
                                  <i className='fas fa-angle-down main-header__link-icon'></i>
                                  <ul className="main-header__dropdown">
                                    {
                                      menu.submenus.map((item , index) => (
                                          <li className="main-header__dropdown-item" key={index}>
                                            <Link to={item.href} className="main-header__dropdown-link">
                                              {item.title}
                                            </Link>
                                          </li>
                                      ))
                                    }
                                  </ul>
                                </>
                            )
                        }
                      </Link>
                    </li>
                ))
              }
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>

            {authContext.isLoggedIn ? (
              <Link to="#" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
