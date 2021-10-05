import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { countries } from "../../script/selections";
import axios from "axios";

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      location: "",
    };
    this.passSubmit = this.passSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
  }

  handleChange(e) {
    if (
      e.target.name === "current-password" ||
      e.target.name === "new-password"
    ) {
      this.setState({
        password: e.target.value,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  passSubmit(e) {
    e.preventDefault();
    const purpose = this.props.purpose;
    if (purpose === "LogIn") {
      this.props.goAuth(
        {
          username: this.state.username,
          password: this.state.password,
        },
        "login"
      );
    } else if (purpose === "SignUp") {
      this.props.goAuth({ ...this.state }, "signup");
    }
  }

  recoverPassword() {
    const recoveryEmail = async () => {
      try {
        let data = await axios.post(`/api/mail/send`, {
          subject: "recover pw",
          message: "hello mafer",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    return recoveryEmail();
  }

  render() {
    const { handleChange } = this;
    const { error, purpose } = this.props;
    return (
      <div>
        <form onSubmit={this.passSubmit}>
          <h4 id="new-order-title">
            {purpose === "LogIn" ? "Log In" : "Sign Up"}
          </h4>
          {purpose === "SignUp" ? (
            <div>
              <label htmlFor="email">Email:</label>&nbsp;&nbsp;
              <input
                name="email"
                onChange={handleChange}
                value={this.state.email}
                required
              />
            </div>
          ) : null}
          <div>
            <label htmlFor="username">Username:</label>&nbsp;&nbsp;
            <input
              name="username"
              onChange={handleChange}
              value={this.state.username}
              required
            />
          </div>
          <br></br>
          <div>
            <label
              htmlFor={
                purpose === "LogIn" ? "current-password" : "new-password"
              }
            >
              Password:
            </label>
            &nbsp;&nbsp;
            <input
              name={purpose === "LogIn" ? "current-password" : "new-password"}
              type="password"
              autoComplete={
                purpose === "LogIn" ? "current-password" : "new-password"
              }
              value={this.state.password}
              onChange={handleChange}
              required
            />
          </div>
          {purpose === "SignUp" ? (
            <div>
              <label htmlFor="birthday">Birthday:</label>&nbsp;&nbsp;
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={this.state.birthday}
                onChange={handleChange}
              />
            </div>
          ) : null}
          <br></br>
          {purpose === "SignUp" ? (
            <div>
              <label htmlFor="location">Country:</label>&nbsp;&nbsp;
              <select name="location" onChange={handleChange}>
                {countries.map((country, idx) => {
                  return (
                    <option
                      value={`${country}`}
                      key={idx}
                    >{`${country}`}</option>
                  );
                })}
              </select>
            </div>
          ) : null}
          <div>
            <button type="submit">
              {purpose === "LogIn" ? "Log In" : "Sign Up"}
            </button>
          </div>
          {purpose === "LogIn" ? (
            <button className="yellow" onClick={this.recoverPassword}>
              Forgot Password?
            </button>
          ) : null}
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
