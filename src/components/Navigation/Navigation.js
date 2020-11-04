import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import * as ROLES from "constants/roles";
import SignOutButton from "components/SignOut/SignOut";
import { SessionContext } from "components/Session";

export default function Navigation() {
  const user = useContext(SessionContext);

  if (user) {
    return <NavigationAuthSubject user={user} />;
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
const NavigationAuthSubject = ({ user }) => (
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
    {user.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

NavigationAuthSubject.propTypes = {
  user: PropTypes.shape({
    roles: PropTypes.shape({}),
  }).isRequired,
};
