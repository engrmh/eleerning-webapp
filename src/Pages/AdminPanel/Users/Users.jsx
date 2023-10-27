import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import AuthContext from "../../../Components/context/authContext";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  return (
    <>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th className="text-black bg-info">شناسه</th>
              <th className="text-black bg-info">نام و نام خانوادگی</th>
              {/*<th className="text-black bg-info">شماره</th>*/}
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
                {/*<td>{user.phone}</td>*/}
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn">
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn">
                    مسدود
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
