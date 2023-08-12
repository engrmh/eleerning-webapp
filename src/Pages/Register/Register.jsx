import React from "react";
import "./Register.css";
import {json, Link} from "react-router-dom";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import {emailValidator, maxValidator, minValidator, requiredValidator} from "../../Validators/rules";
import {useForm} from "../../hooks/useForm";

export default function Register() {
  const [formState , onInputHandler] = useForm({
    name: {
      value: '',
      isValid : false
    },
    username: {
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
    password: {
      value: '',
      isValid : false
    },
  })
  const registerNewUser = (e) => {
    e.preventDefault();
    const newUserInfos = {
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      name: formState.inputs.name.value,
      phone: formState.inputs.phone.value
    }

    fetch('http://localhost:4000/v1/auth/register' , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newUserInfos)
    }).then(res => res.json())
  };

  return (
    <section className="login-register">
      <div className="login register-form">
        <span className="login__title">ساخت حساب کاربری</span>
        <span className="login__subtitle">
          خوشحالیم قراره به جمع ما بپیوندی
        </span>
        <div className="login__new-member">
          <span className="login__new-member-text">
            قبلا ثبت‌نام کرده‌اید؟{" "}
          </span>
          <Link className="login__new-member-link" to="/login">
            وارد شوید
          </Link>
        </div>
        <form action="#" className="login-form">
          <div className="login-form__username">
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
          <div className="login-form__username">
            <Input
              element="input"
              className="login-form__username-input"
              id='username'
              type="text"
              placeholder="نام کاربری"
              validation={[
                requiredValidator(),
                minValidator(6),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__username-icon fa-solid fa-hashtag"></i>
          </div>
          <div className="login-form__password">
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
          <div className="login-form__username">
            <Input
                element="input"
                className="login-form__username-input"
                id='phone'
                type="tel"
                placeholder="شماره تماس"
                validation={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
            />
            <i className="login-form__username-icon fa-solid fa-phone"></i>
          </div>
          <div className="login-form__password">
            <Input
              element="input"
              id='password'
              className="login-form__password-input"
              type="password"
              placeholder="رمز عبور"
              validation={[
                requiredValidator(),
                minValidator(8),
                maxValidator(18)
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__password-icon fa fa-lock-open"></i>
          </div>
          <Button
            className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'}`}
            type="submit"
            onClick={(e) => registerNewUser(e)}
            disabled={!formState.isFormValid}
          >
            <i className="login-form__btn-icon fa fa-user-plus"></i>
            <span className="login-form__btn-text">عضویت</span>
          </Button>
        </form>
        <div className="login__des">
          <span className="login__des-title">سلام کاربر محترم:</span>
          <ul className="login__des-list">
            <li className="login__des-item">
              لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده
              کنید.
            </li>
            <li className="login__des-item">
              ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
            </li>
            <li className="login__des-item">
              لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
