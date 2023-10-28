import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../../Validators/rules";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
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
  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: `${formState.inputs.name.value}`,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then(() => {
        getAllUsers();
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
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>

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
