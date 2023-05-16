import React, { useState,useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import eyeIcon from "../../assets/images/eye-icon.svg";
import appStore from "../../assets/images/app-store.png";
import googlePlay from "../../assets/images/google-play.png";

import "./Login.css";

const Login = () => {
  const [visibility, setVisibility] = useState(false);
  const [disable, setDisable]= useState(true)
  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validationSchema: Yup.object({
      account: Yup.string().email('The email format is not valid')
          .required('This is required field'),
      password: Yup.string()
          .min(8, 'The password should be greater than 8 characters')
          .required('This is required field')
          .matches(
              /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "The password format is not valid"
          ),
    }
    ),
    onSubmit: (values,action) => {

      alert(JSON.stringify(values, null, 2));
       action.setSubmitting(false);
    },
  });
  useEffect(() => {
    setDisable(!formik.isValid);
  }, [formik.isValid]);


  return (
    <div className="login-page">
      <div className="login-section">
        <h2 className="title">Instagram</h2>
        <div className="login-container">
          <form method="post" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="account"
                name="account"
                // className="form-control-input"
                className={
                  formik.touched.account && formik.errors.account ? "form-control-error" : "form-control-input"
                }
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.account}
              />
              {formik.touched.account && formik.errors.account ? (
                  <div className="errorMessage">{formik.errors.account}</div>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type={visibility ? "text" : "password"}
                id="password"
                name="password"
                className={
                  formik.touched.password && formik.errors.password ? "form-control-error" : "form-control-input"
                }
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                  <div className="errorMessage">{formik.errors.password}</div>
              ) : null}
              <button
                type="button"
                className="visibility"
                onClick={() => setVisibility(!visibility)}
              >
                <img src={eyeIcon} alt="eye-icon" />
              </button>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary login-btn" disabled={disable}>
                <span>Log In</span>
              </button>
            </div>
          </form>
          <p className="seperator">
            <span className="seperator-text">or</span>
          </p>
          <ul className="alternative-login">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-icon"></span>
                <span className="social-text">Login with Facebook</span>
              </a>
            </li>
          </ul>
          <p className="forget-password">
            <a href="https://www.instagram.com/">Forgot password?</a>
          </p>
        </div>
      </div>
      <div className="signup-section">
        <p>
          Don't have an account? <a href="/signUp">Sign up</a>
        </p>
      </div>
      <div className="get-the-app-section">
        <p className="get-the-app-text">Get the app</p>
        <div className="store-list">
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
            <img className="digital-store" src={appStore} alt="app-store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D5FFEA1A9-BA03-4013-A737-939DD21CF41F%26utm_content%3Dlo%26utm_medium%3Dbadge">
            <img className="digital-store" src={googlePlay} alt="app-store" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
