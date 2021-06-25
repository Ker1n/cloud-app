import React from "react";
import "./Profile.scss";

import { deleteAvatar, uploadAvatar } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "./../Elements/Input/Input";
import { BackgroundAnimation } from "./../Elements/BackgroundAnimation";

import { NavLink } from "react-router-dom";

import { API_URL } from "../../config";

export const Profile = () => {
  const [changeName, setChangeName] = React.useState("");
  const [changePassword, setchangePassword] = React.useState("");
  const [validationPassword, setValidationPassword] = React.useState("");

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const avatar = `${API_URL + currentUser.avatar}`;
  const avatarChangeHandler = (event) => {
    const file = event.target.files[0];
    dispatch(uploadAvatar(file));
  };

  return (
    <>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar">
            {currentUser.avatar ? (
              <img src={avatar} alt="user" />
            ) : (
              <div className="profile__default-avatar">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <div className="profile__buttons">
            <div
              className="profile__delete-photo"
              onClick={() => dispatch(deleteAvatar())}
            >
              <i class="fas fa-trash-alt"></i>
            </div>
            <div className="profile__upload-photo">
              <label htmlFor="upload-photo">
                <i className="fas fa-camera"></i>
              </label>
              <input
                accept="image/*"
                onChange={avatarChangeHandler}
                type="file"
                id="upload-photo"
                className="upload-photo-input"
              />
            </div>
          </div>
          <div className="profile__change-name">
            <Input
              width={370}
              value={changeName}
              changeValue={setChangeName}
              type="text"
              label={"Change name"}
            />
          </div>
          <div className="login__btn profile__btn">
            <button
              className="btn__login"
              onClick={() => alert("not working yet")}
            >
              Change name
            </button>
          </div>
          <div className="profile__change-password">
            <div className="change-password__val1">
              <Input
                width={370}
                value={changePassword}
                changeValue={setchangePassword}
                label={"Change Password"}
                type="password"
              />
            </div>
            <div className="change-password__val2">
              <Input
                width={370}
                value={validationPassword}
                changeValue={setValidationPassword}
                label={"Change Password"}
                type="password"
              />
            </div>
          </div>
          <div className="login__btn profile__btn">
            <button
              className="btn__login"
              onClick={() => alert("not working yet")}
            >
              Change password
            </button>
          </div>
        </div>
      </div>
      <div className="profile__bg-animation">
        <BackgroundAnimation />
      </div>
      <div className="profile__logo">
            <NavLink to="/">
              <i className="fab fa-cloudversify"></i>
            </NavLink>
          </div>
    </>
  );
};
