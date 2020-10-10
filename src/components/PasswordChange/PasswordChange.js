import React, { Component, useContext } from "react";
import { FirebaseContext } from "components/Firebase";

export default function PasswordChangePage() {
  const firebase = useContext(FirebaseContext);
  return (
    <div>
      <h1>Password Change</h1>
      <PasswordChangeForm firebase={firebase} />
    </div>
  );
}
const getInitialState = () => ({
  passwordOne: "",
  passwordTwo: "",
  /* firebase error object */
  error: null,
});

// TODO: 2020/10/10 jagretz - switch to a function component with useState hook
/* Test suggestions:
- validates passwords before submitting a request to change the password by enabling or disabling the submit
- sends a request to change the password
*/
class PasswordChangeForm extends Component {
  state = getInitialState();

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
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
    const { passwordOne, passwordTwo, error } = this.state;

    // simple validation
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
