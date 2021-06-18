import React from "react";
import "./authPage.scss";

import { useDispatch } from 'react-redux';

import  CloudServer  from "../../assets/img/authPage/cloud-server.png"
import sighUpImg from '../../assets/img/authPage/log.svg';

import { registration, login } from '../../redux/actions/user';



export const AuthPage = () => {

  const dispatch = useDispatch();

  const [emailAuthorization, setEmailAuthorization] = React.useState("");
  const [passwordAuthorization, setPasswordAuthorization] = React.useState("");
  const [emailRegistration, setEmailRegistration] = React.useState("");
  const [passwordRegistration, setPasswordRegistration] = React.useState("");

 

  const removeSignUpClass = () => {
    const container = document.querySelector(".container");
    container?.classList.remove("sign-up-mode");

  }
  const addSignUpClass = () => { 
    const container = document.querySelector(".container");
    container?.classList.add("sign-up-mode")
  }
 
  const completeRegistration = () => { 
    registration(emailRegistration, passwordRegistration);
    setEmailRegistration("");
    setPasswordRegistration("");
    removeSignUpClass()
  }

  const completeLogin = () => { 
    dispatch(login(emailAuthorization, passwordAuthorization));
    setEmailAuthorization("");
    setPasswordAuthorization("");
  }

  return (
    <div className="authPage__wrapper">
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" value={emailAuthorization} onChange={(e)=>setEmailAuthorization(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={passwordAuthorization} onChange={(e) => setPasswordAuthorization(e.target.value)}/>
              </div>
              <input type="submit" value="Login" className="btn solid" onClick={completeLogin}  />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="First name" />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Last name" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" value={emailRegistration} onChange={(e) => setEmailRegistration(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={passwordRegistration}  onChange={(e) => setPasswordRegistration(e.target.value)}/>
              </div>
              <input type="submit" className="btn" value="Sign up" onClick={completeRegistration} />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent btn-sigh" id="sign-up-btn" onClick={addSignUpClass}>
                Sign up
              </button>
            </div>
            <img src={CloudServer} className="image" alt="CloudServer" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent btn-sigh btn-sigh-blue" id="sign-in-btn" onClick={removeSignUpClass}>
                Sign in
              </button>
            </div>
            <img src={sighUpImg} className="image" alt="sighUpImg" />
          </div>
        </div>
      </div>
    </div>
  );
};
