import React from "react";
import { connect } from "react-redux";
import { countries } from "../../script/selections";
import { editProfile, editPassword } from "../store";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editPassword: false,
      username: this.props.auth.username || "",
      email: this.props.auth.email || "",
      birthday: this.props.auth.birthday || undefined,
      location: this.props.auth.location || "",
      currentPW: "",
      newPW: "",
    };
    this.toggleState = this.toggleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleState(type) {
    if (type === "prof") {
      this.setState({ editing: !this.state.editing });
    } else if (type === "pw") {
      this.setState({ editPassword: !this.state.editPassword });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editing) {
      this.props.changeProfile({
        username: this.state.username,
        email: this.state.email,
        birthday: this.state.birthday,
        location: this.state.location,
      });
      this.setState({ editing: false });
    }
    if (this.state.editPassword) {
      this.props.changePW(
        {
          username: this.props.auth.username,
          password: this.state.currentPW,
        },
        this.state.newPW
      );
      alert("Password Has Been Changed");
      this.setState({ editPassword: false });
    }
  }

  render() {
    const { username, email, location, birthday, editing } = this.state;
    const error = this.props.error;
    return (
      <div className="profile-main-container">
        <h3 className="groups-title">Profile Settings</h3>
        <h3>♥♥♥</h3>
        <div className="profile-info-container">
          <div className="profile-info-inner">
            <form onSubmit={this.handleSubmit}>
              {!this.state.editPassword ? (
                <div>
                  {" "}
                  <div className="new-order-field">
                    ○ <label htmlFor="username">Username:</label>&nbsp;&nbsp;
                    {editing ? (
                      <input
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <span>{username}</span>
                    )}
                  </div>
                  <br></br>
                  <div className="new-order-field">
                    ○ <label htmlFor="email">Email:</label>&nbsp;&nbsp;
                    {editing ? (
                      <input
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <span>{email}</span>
                    )}
                  </div>
                  <br></br>
                  <div className="new-order-field">
                    ○ <label htmlFor="location">Location:</label>&nbsp;&nbsp;
                    {editing ? (
                      <select
                        name="location"
                        value={location}
                        onChange={this.handleChange}
                      >
                        <option value="">No Option</option>
                        {countries.map((country, idx) => {
                          return (
                            <option
                              value={`${country}`}
                              key={idx}
                            >{`${country}`}</option>
                          );
                        })}
                      </select>
                    ) : (
                      <span>{location || "Unknown"}</span>
                    )}
                  </div>
                  <br></br>
                  <div className="new-order-field">
                    ○ <label htmlFor="birthday">Birthday:</label>&nbsp;&nbsp;
                    {editing ? (
                      <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={birthday}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <span>{birthday || "Unknown"}</span>
                    )}
                  </div>
                  <br></br>
                  {error ? <div> {error.response.data} </div> : null}
                  <br></br>
                  {editing ? (
                    <div>
                      <button
                        type="reset"
                        onClick={() => this.toggleState("prof")}
                      >
                        Cancel
                      </button>
                      <button className="yellow" type="submit">
                        Submit
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  <div className="new-order-field">
                    ○ <label htmlFor="currentPW">Current Password:</label>
                    &nbsp;&nbsp;
                    <input
                      name="currentPW"
                      value={this.state.currentPW}
                      type="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br></br>
                  <div className="new-order-field">
                    ○ <label htmlFor="newPW">New Password:</label>
                    &nbsp;&nbsp;
                    <input
                      name="newPW"
                      value={this.state.newPW}
                      type="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br></br>
                  {error ? <div> {error.response.data} </div> : null}
                  <button onClick={() => this.toggleState("pw")}>Cancel</button>
                  <button className="yellow" type="submit">
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
          <br></br>
          {!this.state.editing && !this.state.editPassword ? (
            <div className="profile-buttons-container">
              <button
                className="buttons mint"
                id="profile-form-button"
                onClick={() => this.toggleState("prof")}
              >
                +Edit Profile
              </button>
              <button
                className="buttons yellow"
                id="profile-form-button"
                onClick={() => this.toggleState("pw")}
              >
                +Edit Password
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    error: state.auth.error,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeProfile: (edited) => dispatch(editProfile(edited)),
    changePW: (currentData, newPW) =>
      dispatch(editPassword(currentData, newPW)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
