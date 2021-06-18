import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux';

import { NavBar } from './components/navBar/NavBar';
import { AuthPage } from './components/authPage/authPage';
import {auth} from './redux/actions/user'
import { Disk } from './components/disk/Disk';

function App() {

   const isAuth = useSelector(state => state.user.isAuth)
   const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
    {
      !isAuth ? 
      <Switch>
        <Route  path="/" component={AuthPage} />
        <Redirect to="/" />
      </Switch>
      : 
      <div className="main">
      <NavBar />  
      <Switch>
          <div className="content">
          <Route path="/" component={Disk} />
          </div>
          <Redirect to="/" />
        </Switch>  
      </div>
    }
    </div>
    </BrowserRouter>
  );
}

export default App;
