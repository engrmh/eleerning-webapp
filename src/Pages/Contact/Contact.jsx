import React, {useContext, useState} from "react";
import "./Contact.css";
import {Link , useNavigate} from "react-router-dom";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import {emailValidator, maxValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {useForm} from "../../hooks/useForm";
import AuthContext from "../../Components/context/authContext";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";

export default function Contact() {
  const navigate = useNavigate()
  const [isGoogleRecapthaVerify, setIsGoogleRecapthaVerify] = useState(false)
  const [formState , onInputHandler] = useForm({
    name: {
      value: '',
      isValid : false
    },
    email: {
      value: '',
      isValid : false
    },
    phone: {
      value: '',
      isValid : false
    },
    body: {
      value: '',
      isValid : false
    }
  })

  const onChangeHandler = () => {
    setIsGoogleRecapthaVerify(true)
  }

  const addNewContact = (event) => {
    event.preventDefault()
    const newContactInfos = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      body: formState.inputs.body.value
    }

    fetch('http://localhost:4000/v1/contact' , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newContactInfos)
    }).then(res => {
      if (!res.ok){
        return res.text().then(text => {
          throw new Error(text)
        })
      }else {
        return res.json()
      }
    }).then(result => {
      swal({
        title: "با موفقیت ارسال شد",
        icon: "success",
        button: "بازگشت به خانه",
      }).then(() => {
        navigate('/')
      })

    }).catch(err =>{
      swal({
        title: "ارسال با شکست مواجه شد",
        icon: "error",
        button: "تلاش دوباره",
      });
    })
  };

  return (
    <>
      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                  element="input"
                  className="login-form__username-input"
                  id='name'
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  validation={[
                    requiredValidator(),
                    minValidator(6),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                  element="input"
                  id='email'
                  className="login-form__username-input"
                  type="text"
                  placeholder="آدرس ایمیل"
                  validation={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(30),
                    emailValidator()
                  ]}
                  onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                  element="input"
                  className="login-form__username-input"
                  id='phone'
                  type="number"
                  placeholder="شماره تماس"
                  validation={[
                    requiredValidator(),
                    minValidator(6),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                  element="textarea"
                  className="login-form__username-input"
                  id='body'
                  type="textarea"
                  placeholder="متن خود را وارد نمایید."
                  validation={[
                    requiredValidator(),
                    minValidator(6),
                  ]}
                  onInputHandler={onInputHandler}
              />
            </div>
            <div className="login-form__password my-2">
              <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChangeHandler}
              />
            </div>
            <Button
              className={`login-form__btn ${formState.isFormValid && isGoogleRecapthaVerify ? 'login-form__btn-success' : 'login-form__btn-error'}`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid || !isGoogleRecapthaVerify}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
