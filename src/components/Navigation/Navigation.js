import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import SignOutButton from "components/SignOut/SignOut";
import { SessionContext } from "components/Session";

export default function Navigation() {
  const authUser = useContext(SessionContext);

  if (authUser) {
    return <NavigationAuthSubject />;
  }

  return <NavigationNonAuthSubject />;
}

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
