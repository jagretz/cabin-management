import React, { Component } from "react";
// import PropTypes from "prop-types";
// TODO: 2020/10/03 jagretz - I believe the latest version of react-router
// introduced hooks to replace the `withRouter` HOC. Check it out.
import { withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import * as ROLES from "constants/roles";

class SignInGoogleBase extends Component {
  state = { error: null };

  onSubmit = (event) => {
    const { firebase } = this.props;
    firebase
      .doSignInWithGoogle()
      .then((googleUser) => {
        const { user } = googleUser;
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
          username: user.displayName,
          email: user.email,
          roles: { [ROLES.USER]: ROLES.USER },
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const GoogleSignIn = withRouter(SignInGoogleBase);

export default GoogleSignIn;
