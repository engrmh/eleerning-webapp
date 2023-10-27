import React, { useEffect, useState } from "react";

export default function Topbar() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationBox, setIsShowNotificationBox] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearar ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminInfo(data);
        setAdminNotifications(data.notifications);
      });
  }, [seeNotification]);

  function seeNotification(id) {
    fetch(`https://localhost:400/v1/notifications/see/`, {
      method: "PUT",
      headers: {
        Autorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => res.json());
  }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="home-header">
          <div
            className={`home-right ${
              isShowNotificationBox && "active-modal-notfication"
            }`}
          >
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationBox(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationBox(true)}
              onMouseLeave={() => setIsShowNotificationBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.length === 0 ? (
                  <li className="home-notification-modal-item fs-4">
                    اعلانی برای نمایش وجود ندارد
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notif, index) => (
                      <li className="home-notification-modal-item" key={index}>
                        <span className="home-notification-modal-text">
                          {notif}
                        </span>
                        <label className="switch">
                          <a
                            href="javascript:void(0)"
                            className=""
                            onClick={() => seeNotification(notif._id)}
                          >
                            دیدم
                          </a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile d-flex align-items-center">
              <div className="home-profile-image">
                <a href="#">
                  <img
                    src={
                      adminInfo.profile
                        ? adminInfo.profile
                        : "/images/svgs/avatar.svg"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
