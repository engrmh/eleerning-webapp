import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  };
  const userRemoveHandler = (userID) => {
    swal({
      title: "برای حذف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "با موفقیت حذف شد",
              icon: "success",
              buttons: "متوجه شدم",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };

  const userBanHandler = (userID) => {
    swal({
      title: "برای مسدودی کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت مسدود شد",
              icon: "success",
              buttons: "متوجه شدم",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };
  return (
    <>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th className="text-black bg-info">شناسه</th>
              <th className="text-black bg-info">نام و نام خانوادگی</th>
              <th className="text-black bg-info">شماره</th>
              <th className="text-black bg-info">ایمیل</th>
              <th className="text-black bg-info">نام کاربری</th>
              <th className="text-black bg-info">ویرایش</th>
              <th className="text-black bg-info">حذف</th>
              <th className="text-black bg-info">مسدود</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                {user.role !== "ADMIN" && (
                  <>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                      >
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => userRemoveHandler(user._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => userBanHandler(user._id)}
                      >
                        مسدود
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
