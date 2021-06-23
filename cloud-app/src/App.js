import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {useSelector, useDispatch} from 'react-redux';

import {auth} from './redux/actions/user'
import { Disk } from './components/disk/Disk';
import { Profile } from './components/Profile/Profile';

import {Login} from "./components/Auth/Login/Login";
import {Registration} from './components/Auth/Registration/Registration'



const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="authPages" timeout={1000} exit={false} unmountOnExit={true}>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Redirect to='/login' />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));


function App() {

   const isAuth = useSelector(state => state.user.isAuth);
   const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth())
  }, [])

  return (
      <Router>
        <div className="app">
          {/* <NavBar />  */}
          <div className="app__wrapper">
              {!isAuth ? 
              <AnimatedSwitch />
                : 
                <Switch>
                  <Route exact path="/" component={Disk} />
                  <Route exact path="/profile" component={Profile} />
                  <Redirect to="/" />
                </Switch>            
              }
          </div>
        </div>
      </Router>
    );
  }

export default App;



