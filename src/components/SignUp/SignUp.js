import React, { Component, useContext /* useState, useEffect */ } from "react";
// import PropTypes from "prop-types";
// TODO: 2020/10/03 jagretz - I believe the latest version of react-router
// introduced hooks to replace the `withRouter` HOC. Check it out.
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "components/Firebase";
import * as ROUTES from "constants/routes";
import * as ROLES from "constants/roles";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS =
  "An account with this E-Mail address already exists. Try to login with this " +
  "account instead. If you think the account is already used from a social " +
  "logins, try to sign-in with one of them. You can associate social login" +
  "accounts from your account settings.";

export default function SignUpPage() {
  const firebase = useContext(FirebaseContext);

  return (
    <div>
      <h1>SignUp</h1>

      {/* `firebase` can be moved directly to the `SignUpForm` component with
      the `useContext` hook once it's converted to a function component. */}
      <SignUpForm firebase={firebase} />
    </div>
  );
}

const getInitialState = () => ({
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAmin: false,
  /* firebase error object */
  error: null,
});

// TODO: 2020/10/03 jagretz - switch to a function component with useState hook
class SignUpFormBase extends Component {
  state = getInitialState();

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const { firebase, history } = this.props;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    } else {
      roles[ROLES.USER] = ROLES.USER;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        /*
        Create a new user in firebase (realtime database or firestore?)
        */
        return firebase.user(authUser.user.uid).set({ username, email, roles });
      })
      .then(() => {
        return firebase.auth.doSendEmailVerification(/* email provider */);
      })
      .then((/* authUser */) => {
        /* on success
        - Reset component state and user input
        - redirect to HOME
        */
        this.setState(getInitialState());
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        const err = { ...error };

        if (err.code === ERROR_CODE_ACCOUNT_EXISTS) {
          err.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        // reset pw fields
        this.setState({ error: err, passwordOne: "", passwordTwo: "" });
      });

    // prevents a reloading the browser (native functionality) -- This might be removed with react v17.
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event?.target?.name]: event?.target?.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event?.target?.name]: event?.target?.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    /* sign-up constraints:
    - username - exists, is a valid string (what's valid?)
    - email - exists, is a valid string (what's valid?)
    - password - exists, is a valid string (what's valid?)
    - both passwords are the same, and
    */
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <label>
          Admin
          <input
            name="admin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>

        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>

        {/* Rely on firebase to provide the appropriate error message content (text)
        to present to the users in the case of an error */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);
export { SignUpForm };

export const SignUpLink = () => (
  <p>
    {/* eslint-disable-next-line react/no-unescaped-entities */}
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
