import React, { useEffect, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";

import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AppContainer from "./AppContainer";

class Screens extends React.Component {

  async componentDidMount() {
    const userToken = localStorage.getItem('userToken')
    const request = await fetch(`http://192.168.1.14:5000/user/checkToken/${userToken}`)
    const response = await request
    if (response.status == 401) {
      localStorage.removeItem('userToken')
      if (window.location.hash != '#/signin' && window.location.hash != '#/signup') window.location.hash = '/signin'
    }
  }

  render() {
    const routes = [
      { url: "", component: <Home /> },
      { url: "signin", component: <SignIn /> }
    ];
  
    const loading = (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  
    return (
  
      <HashRouter basename="/">
        <Suspense fallback={loading}>
          <AppContainer>
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  //component={data.component}
                  render={() => data.component}
                />
              ))}
            </Switch>
          </AppContainer>
        </Suspense>
      </HashRouter>
  
    )
  }  
}

export default Screens;