import React from "react";
import "./Registration.scss";

import { Redirect, NavLink } from "react-router-dom";


import { useDispatch } from "react-redux";
import { registration } from "../../../redux/actions/user";

import { BackgroundAnimation } from "../../Elements/BackgroundAnimation";
import { Input } from "../../Elements/Input/Input";

export const Registration = () => {
  const [nameRegistration, setNameRegistration] = React.useState("");
  const [emailRegistration, setEmailRegistration] = React.useState("");
  const [passwordRegistration, setPasswordRegistration] = React.useState("");
  const [passwordValidator, setPasswordValidator] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const dispatch = useDispatch();

  const completeRegistration = () => {
    registration(emailRegistration, passwordRegistration);
    setEmailRegistration("");
    setPasswordRegistration("");
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect push to="/login" />;
  }

  return (
        <div className="registration__wrapper">
          <div className="registration__animation-block">
            <BackgroundAnimation />
          </div>
          <div className="registration__body">
            <div className="registration__title">
              <i class="fab fa-cloudversify"></i>
              <span> we are always glad for a new user</span>
            </div>
            <div className="registration__email">
              <Input
                label={"Name"}
                width={370}
                type="text"
                value={nameRegistration}
                changeValue={setNameRegistration}
              />
            </div>
            <div className="registration__email">
              <Input
                label={"Email"}
                width={370}
                type="text"
                value={emailRegistration}
                changeValue={setEmailRegistration}
              />
            </div>
            <div className="registration__password">
              <Input
                type="password"
                label={"Password"}
                value={passwordRegistration}
                changeValue={setPasswordRegistration}
                width={370}
              />
            </div>
            <div className="registration__password">
              <Input
                type="password"
                label={"Password"}
                value={passwordValidator}
                changeValue={setPasswordValidator}
                width={370}
              />
            </div>
            <div className="registration__login">
              <NavLink to="/login">Already have an account? Sign In</NavLink>
            </div>
            <div className="registration__btn">
              <button
                className="btn__registration"
                onClick={completeRegistration}
              >
                Sigh up
              </button>
            </div>
          </div>
        </div>
  );
};
