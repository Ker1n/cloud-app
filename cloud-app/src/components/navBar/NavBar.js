import React from "react";
import "./navBar.scss";
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/reducers/userReducer';


import Logo from "../../assets/img/navBar/cloudLogo.png";

export const NavBar = () => {

  const dispatch = useDispatch()
  
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__wrapper">
          <div className="navbar__logo">
            <img src={Logo} alt="navbar__logo" />
          </div>
          <div className="navbar__body">
            <div className="navbar__signIn" onClick={() => dispatch(logoutUser())}>logout</div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
