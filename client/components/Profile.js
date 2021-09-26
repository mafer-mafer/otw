import React from "react";
import { connect } from "react-redux";
import { countries } from "../../script/selections";
import { editProfile, editPassword } from "../store";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingProfile: false,
      editingPassword: false,
      username: this.props.auth.username || "",
      email: this.props.auth.email || "",
      birthday: this.props.auth.birthday || undefined,
      location: this.props.auth.location || "",
      currentPW: "",
      newPW: "",
      error: "",
    };
    this.toggleState = this.toggleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
  }

  toggleState(type) {
    if (type === "prof") {
      this.setState({ editingProfile: !this.state.editingProfile, error: "" });
    } else if (type === "pw") {
      this.setState({
        editingPassword: !this.state.editingPassword,
        error: "",
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editingProfile) {
      this.props.changeProfile(
        {
          username: this.state.username,
          email: this.state.email,
          birthday: this.state.birthday,
          location: this.state.location,
        },
        this.showError
      );
      this.setState({ editingProfile: false });
    }
    if (this.state.editingPassword) {
      this.props.changePW(
        {
          username: this.props.auth.username,
          password: this.state.currentPW,
        },
        this.state.newPW,
        this.showError
      );
      this.setState({ editingPassword: false });
      // FIND WAY TO HAVE POP UP ONLY IF IT DID CHANGE
      // if (!this.state.error.length) {
      //   alert("Password Has Been Changed");
      // }
    }
  }

  showError(error) {
    this.setState({
      error,
      username: this.props.auth.username || "",
      email: this.props.auth.email || "",
      birthday: this.props.auth.birthday || undefined,
      location: this.props.auth.location || "",
      currentPW: "",
      newPW: "",
    });
  }

  render() {
    console.log("state is", this.state);
    const {
      username,
      email,
      location,
      birthday,
      editingProfile,
      editingPassword,
      error,
    } = this.state;
    return (
      <div className="profile-main-container">
        <h3 className="groups-title">Profile Settings</h3>
        <h3>♥♥♥</h3>
        <div className="profile-info-container">
          <div className="profile-info-inner">
            <form onSubmit={this.handleSubmit}>
              {!editingPassword ? (
                <div>
                  <div className="new-order-field">
                    ○ <label htmlFor="username">Username:</label>&nbsp;&nbsp;
                    {editingProfile ? (
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
                    {editingProfile ? (
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
                    {editingProfile ? (
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
                    {editingProfile ? (
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
                  {error.length ? <div> {error} </div> : null}
                  <br></br>
                  {editingProfile ? (
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
                  {error.length ? <div> {error} </div> : null}
                  <button onClick={() => this.toggleState("pw")}>Cancel</button>
                  <button className="yellow" type="submit">
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
          <br></br>
          {!editingProfile && !editingPassword ? (
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
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeProfile: (edited, func) => dispatch(editProfile(edited, func)),
    changePW: (currentData, newPW, func) =>
      dispatch(editPassword(currentData, newPW, func)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
