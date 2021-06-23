import React from "react";
import "./Login.scss";

import { NavLink } from "react-router-dom";


import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/user";

import { BackgroundAnimation } from "../../Elements/BackgroundAnimation";
import { Input } from "../../Elements/Input/Input";

export const Login = () => {
  const dispatch = useDispatch();
  const [emailAuthorization, setEmailAuthorization] = React.useState("");
  const [passwordAuthorization, setPasswordAuthorization] = React.useState("");

  const completeLogin = () => {
    dispatch(login(emailAuthorization, passwordAuthorization));
    setEmailAuthorization("");
    setPasswordAuthorization("");
  };

  return (
        <div className="login__wrapper">
          <div className="login__animation-block">
            <BackgroundAnimation />
          </div>
          <div className="login__body">
            <div className="login__title">
              <i class="fab fa-cloudversify"></i>
              <span> We store your personal data</span>
            </div>
            <div className="login__email">
              <Input
                label={"Email"}
                width={370}
                type="text"
                value={emailAuthorization}
                changeValue={setEmailAuthorization}
              />
            </div>
            <div className="login__password">
              <Input
                type="password"
                label={"Password"}
                value={passwordAuthorization}
                changeValue={setPasswordAuthorization}
                width={370}
              />
            </div>
            <div className="login__registration">
              <NavLink to="/registration">
                Don't have an account? Sign Up
              </NavLink>
            </div>
            <div className="login__btn">
              <button className="btn__login" onClick={completeLogin}>
                Sigh in
              </button>
            </div>
          </div>
        </div>
       
  );
};
