import React, { Component } from "react";
// import PropTypes from "prop-types";
// TODO: 2020/10/03 jagretz - I believe the latest version of react-router
// introduced hooks to replace the `withRouter` HOC. Check it out.
import { withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import * as ROLES from "constants/roles";

export const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

export const ERROR_MSG_ACCOUNT_EXISTS =
  "An account with an E-Mail address to this social account already exists." +
  " Try to login from this account instead and associate your social accounts" +
  " from your account settings.";

class FacebookSignInBase extends Component {
  state = { error: null };

  onSubmit = (event) => {
    const { firebase } = this.props;
    firebase
      .doSignInWithFacebook()
      .then((facebookUser) => {
        const { user, additionalUserInfo } = facebookUser;

        /*
        Create a new user in firebase (realtime database or firestore?)
        */
        /* Note:
        If a user signs in twice with the same social login, the previous user
        is overridden. This is intentional and will update to reflect "new"
        information from the user.
        See [additionalUserInfo.isNewUser](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
        to change this behavior programatically.
        */
        return firebase.user(user.uid).set({
          username: additionalUserInfo.profile.name,
          email: additionalUserInfo.profile.email,
          roles: { [ROLES.USER]: ROLES.USER },
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        const err = { ...error };

        if (err.code === ERROR_CODE_ACCOUNT_EXISTS) {
          err.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error: err });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const FacebookSignIn = withRouter(FacebookSignInBase);

export default FacebookSignIn;
