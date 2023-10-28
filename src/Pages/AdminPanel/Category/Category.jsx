import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../Validators/rules";
import { useForm } from "../../../hooks/useForm";
import swal from "sweetalert";
import "./Category.css";

export default function CategoryAPanel() {
  const [categories, setCategories] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }

  const createNewCategory = (event) => {
    event.preventDefault();

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategories();
        });
      });
  };

  const categoryRemoveHandler = (userID) => {
    swal({
      title: "برای حذف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/category/${userID}`, {
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
              getAllCategories();
            });
          }
        });
      }
    });
  };

  const editCategory = (categoryID) => {
    swal({
      title: "عنوان جدید را وارد کنید",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then((res) => {
      if (res.trim().length) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify({
            title: res,
            name: res,
          }),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "با موفقیت ویرایش شد",
              icon: "success",
              buttons: "متوجه شدم",
            }).then(() => {
              getAllCategories();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  id="title"
                  type="text"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validation={[minValidator(5), maxValidator(20)]}
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  id="shortname"
                  type="text"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validation={[minValidator(5), maxValidator(30)]}
                  onInputHandler={onInputHandler}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="دسته‌بندی‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => editCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => categoryRemoveHandler(category._id)}
                  >
                    حذف
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
