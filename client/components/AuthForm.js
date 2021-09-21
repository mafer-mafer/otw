import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.passSubmit = this.passSubmit.bind(this);
  }

  passSubmit(e) {
    e.preventDefault();
    const purpose = this.props.purpose;
    if (purpose === "LogIn") {
      this.props.goAuth(
        e.target.username.value,
        e.target["current-password"].value,
        "login"
      );
    } else if (purpose === "SignUp") {
      this.props.goAuth(
        e.target.username.value,
        e.target["new-password"].value,
        "signup"
      );
    }
  }

  render() {
    const { error, purpose } = this.props;
    return (
      <div>
        <form onSubmit={this.passSubmit}>
          <h4 id="new-order-title">
            {purpose === "LogIn" ? "Log In" : "Sign Up"}
          </h4>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <br></br>
          <div>
            <label
              htmlFor={
                purpose === "LogIn" ? "current-password" : "new-password"
              }
            >
              <small>Password</small>
            </label>
            <input
              name={purpose === "LogIn" ? "current-password" : "new-password"}
              type={purpose === "LogIn" ? "current-password" : "new-password"}
            />
          </div>
          <div>
            <button type="submit">
              {purpose === "LogIn" ? "Log In" : "Sign Up"}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    goAuth: (username, password, formName) =>
      dispatch(authenticate(username, password, formName)),
  };
};

export const LogIn = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
