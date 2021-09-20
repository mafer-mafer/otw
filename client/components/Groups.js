import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFaveGroups } from "../store/faveGroups";
import FormContainer from "./FormContainer";

export class Groups extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getFaveGroups(this.props.auth.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit() {}

  render() {
    return (
      <div className="groups-main-container">
        <div className="groups-inner-nav">
          <div id="groups-nav-side"></div>
          <h3 className="groups-title">Groups I Collect</h3>
          <div id="groups-nav-side">
            <FormContainer
              userId={this.props.auth.id}
              handleSubmit={this.handleSubmit}
              purpose="EditGroups"
              buttonText="+Edit"
              groups={this.props.groups}
            />
          </div>
        </div>
        <div className="groups-all">
          {this.props.isLoggedIn && this.props.faveGroups.length ? (
            <div className="groups-body-container">
              {this.props.faveGroups.map((group) => {
                return (
                  <div key={group.id} className="groups-single-container">
                    <div className="groups-hearts">
                      <div>
                        <span id="group-heart-pink">♥</span>
                        <br></br>
                        <span id="group-heart-mint">♥</span>
                      </div>
                    </div>
                    <div>
                      <Link to={`/group/${group.id}`}>
                        <table>
                          <tbody>
                            <tr>
                              <th>&nbsp;</th>
                            </tr>
                            <tr>
                              <td>{group.name}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : this.props.isLoggedIn ? (
            <h3>Please Log In To Access Your Favorite Groups</h3>
          ) : (
            <h3>Add some fave groups!</h3>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    faveGroups: state.faveGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFaveGroups: (id) => dispatch(setFaveGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
