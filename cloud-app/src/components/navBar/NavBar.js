import React from "react";
import "./navBar.scss";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/reducers/userReducer';

import Logo from "../../assets/img/navBar/cloudLogo.png";
import { getFiles, searchFiles } from "../../redux/actions/file";
import {  showLoader } from "../../redux/reducers/appReducer";

export const NavBar = () => {

  const {currentDir} = useSelector(state =>  state.files)
  const [search, setSearch] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState(false);

  const dispatch = useDispatch();

  
  const searchChangeHandler = (event) => { 
      setSearch(event.target.value);
      if(searchTimeout !== false) {
        clearTimeout(searchTimeout)
      }
      dispatch(showLoader());
      if (event.target.value !== '') { 
        setSearchTimeout(
          setTimeout((value) => {
            dispatch(searchFiles(value));
          }, 500, event.target.value)
        )
      } else { 
        dispatch(getFiles(currentDir))
      }

  };
  

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__wrapper">
          <div className="navbar__logo">
            <img src={Logo} alt="navbar__logo" />
          </div>
          <div className="navbar__body">
            <div className="navbar__search">
              <input type="text" 
                className="navbar__search-input"
                placeholder="Search file"
                value={search}
                onChange={searchChangeHandler}
              />
            </div>
            <div className="navbar__signIn" onClick={() => dispatch(logoutUser())}>logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
