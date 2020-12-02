import React, { Component, useContext } from "react";
// import PropTypes from "prop-types";
// TODO: 2020/10/03 jagretz - I believe the latest version of react-router
// introduced hooks to replace the `withRouter` HOC. Check it out.
import { withRouter } from "react-router-dom";
import { FirebaseContext } from "components/Firebase";
import { SignUpLink } from "components/SignUp/SignUp";
import { PasswordForgetLink } from "components/PasswordForget/PasswordForget";
import * as ROUTES from "constants/routes";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

export default function SignInPage() {
  const firebase = useContext(FirebaseContext);

  return (
    <div>
      <h1>SignIn</h1>

      {/* `firebase` can be moved directly to the `SignUpForm` component with
      the `useContext` hook once it's converted to a function component. */}
      <SignInForm firebase={firebase} />
      <GoogleSignIn firebase={firebase} />
      <FacebookSignIn firebase={firebase} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

const getInitialState = () => ({
  email: "",
  password: "",
  /* firebase error object */
  error: null,
});

class SignInFormBase extends Component {
  state = getInitialState();

  // static propTypes = {};

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        /* on success
        - Reset component state and user input
        - redirect to HOME
        */
        this.setState(getInitialState());
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        // reset password fields
        this.setState({ error, password: "" });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    // really simple validation
    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {/* Rely on firebase to provide the appropriate error message content (text)
        to present to the users in the case of an error */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(SignInFormBase);
export { SignInForm };
