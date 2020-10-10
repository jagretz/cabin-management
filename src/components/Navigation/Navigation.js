import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import SignOutButton from "components/SignOut/SignOut";

export default function Navigation({ authUser }) {
  if (authUser) {
    return <NavigationAuthSubject />;
  }

  return <NavigationNonAuthSubject />;
}

Navigation.propTypes = {
  authUser: PropTypes.shape({}),
};

// authn and authz
const NavigationNonAuthSubject = () => (
  <ul className="navigation">
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

// authn and authz
const NavigationAuthSubject = () => (
  <ul className="navigation">
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);
