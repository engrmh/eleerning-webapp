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
    const localStorageData = JSON.parse(localStorage.getItem("user"));

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
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn">
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
