import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "components/Navigation/Navigation";
import LandingPage from "components/Landing/Landing";
import SignUpPage from "components/SignUp/SignUp";
import SignInPage from "components/SignIn/SignIn";
import PasswordForgetPage from "components/PasswordForget/PasswordForget";
import HomePage from "components/Home/Home";
import AccountPage from "components/Account/Account";
import AdminPage from "components/Admin/Admin";
import { FirebaseContext } from "components/Firebase";
import * as ROUTES from "constants/routes";
import "./App.css";

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const authEventListener = firebase.auth.onAuthStateChanged((authUser) => {
      // eslint-disable-next-line no-unused-expressions
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });

    // removes the firebase auth event listener when the component unmounts.
    return () => authEventListener();
    /*
    Call useEffect with no-args or the #authUser.
    This is important. If anything changes with the authenticated user,
    The app should react appropriately.
    */
  }, [authUser]);

  return (
    <Router>
      <div className="App">
        <Navigation authUser={authUser} />

        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  );
}
