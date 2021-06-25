import React from "react";
import "./navBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userReducer";
import { NavLink } from "react-router-dom";

import { BackgroundAnimation } from "../Elements/BackgroundAnimation";
import Logo from "../../assets/img/navBar/cloudLogo.png";

import { getFiles, searchFiles } from "../../redux/actions/file";
import { showLoader } from "../../redux/reducers/appReducer";

import { API_URL } from "../../config";

export const NavBar = () => {
  const { currentDir } = useSelector((state) => state.files);
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState(false);
  const avatar = `${API_URL + currentUser.avatar}`;

  const dispatch = useDispatch();
  const searchChangeHandler =(e) => {
    setSearch(e.target.value)
    if (searchTimeout !== false) {
        clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if(e.target.value !== '') {
        setSearchTimeout(setTimeout((value) => {
            dispatch(searchFiles(value));
        }, 500, e.target.value))
    } else {
        dispatch(getFiles(currentDir))
    }
}

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__wrapper">
          <div className="navbar__logo">
            <NavLink to="/">
              <i className="fab fa-cloudversify"></i>
            </NavLink>
          </div>
          <div className="navbar__body">
            <div className="navbar__search">
              <input
                type="search"
                placeholder="Search file"
                value={search}
                onChange={searchChangeHandler}
              />
            </div>
            <NavLink to="/profile">
              <div className="user__avatar">
                {currentUser.avatar ? (
                  <img src={avatar} alt="user" />
                ) : (
                  <div className="user__default-user">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
            </NavLink>
            <div
              className="navbar__signOut"
              onClick={() => dispatch(logoutUser())}
            >
              <i className="fas fa-door-open"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// <input type="text"
// className="navbar__search-input"
// placeholder="Search file"
// value={search}
// onChange={searchChangeHandler}
// />
// </div>
// <div>
// <h3>hello</h3>
// <i class="fad fa-folder"></i>
