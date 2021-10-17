import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { countries } from "../../script/selections";
import { resetPassword } from "../store/auth";

export class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: null,
      location: "",
      passwordRecovery: false,
    };
    this.passSubmit = this.passSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
    this.toggleRecovery = this.toggleRecovery.bind(this);
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
    const { username, password, email, birthday, location } = this.state;
    e.preventDefault();
    const purpose = this.props.purpose;
    if (purpose === "LogIn") {
      this.props.goAuth({ username, password }, "login");
    } else if (purpose === "SignUp") {
      this.props.goAuth(
        { username, password, email, birthday, location },
        "signup"
      );
    }
  }

  toggleRecovery() {
    this.setState({ passwordRecovery: !this.state.passwordRecovery });
  }

  recoverPassword(e) {
    e.preventDefault();
    this.props.resetPW(this.state.email); //add func for showing error after!
  }

  render() {
    const { handleChange } = this;
    const { error, purpose } = this.props;
    return (
      <div>
        {!this.state.passwordRecovery ? (
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
            <br></br>
            <div>
              <label htmlFor="username">Username:</label>&nbsp;&nbsp;
              <input
                name="username"
                onChange={handleChange}
                value={this.state.username}
                required
              />
            </div>
            <div>
              <br></br>
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
                <br></br>
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
              <button className="yellow" onClick={this.toggleRecovery}>
                Forgot Password?
              </button>
            ) : null}
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        ) : null
        // <form onSubmit={this.recoverPassword}>
        //   <h4 id="new-order-title">Recover Password</h4>
        //   <div>
        //     <label htmlFor="email">Email:</label>&nbsp;&nbsp;
        //     <input
        //       name="email"
        //       onChange={handleChange}
        //       value={this.state.email}
        //       required
        //     />
        //   </div>
        //   <br></br>
        //   <div>
        //     <button type="submit">Send Email for Password Recovery</button>
        //   </div>
        //   <button className="yellow" onClick={this.toggleRecovery}>
        //     Cancel
        //   </button>
        //   {error && error.response && <div> {error.response.data} </div>}
        // </form>
        }
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
    resetPW: (email, func) => dispatch(resetPassword(email, func)),
  };
};

export const LogIn = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
