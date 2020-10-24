import React, { Component, useContext } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FirebaseContext } from "components/Firebase";
import * as ROUTES from "../../constants/routes";

export default function PasswordForgetPage() {
  const firebase = useContext(FirebaseContext);
  return (
    <div>
      <h1>Password Forget</h1>
      <PasswordForgetFormBase firebase={firebase} />
    </div>
  );
}

const getInitialState = () => ({
  email: "",
  /* firebase error object */
  error: null,
});

// TODO: 2020/10/10 jagretz - switch to a function component with useState hook
/**
 * A form component use for submitting information (email address)
 * as required by the Firebase authentication API to reset a users password.
 * @param {Event} event an event...
 */
class PasswordForgetFormBase extends Component {
  state = getInitialState();

  /**
   * Submits information to the Firebase authentication API
   * @param {Event} event from on-click
   */
  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        /* on success:
        - Reset form input
        */
        this.setState(getInitialState());
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    // simple validation to prevent erroneous submission
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export { PasswordForgetLink };

export function PasswordForgetForm() {
  const firebase = useContext(FirebaseContext);
  return <PasswordForgetFormBase firebase={firebase} />;
}
