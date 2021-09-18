import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFaveGroups } from "../store/faveGroups";

export class Groups extends React.Component {
  constructor() {
    super();

    this.state = {};
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

  render() {
    return (
      <div className="after-scallop">
        <div className="groups-inner-nav">
          <h3 className="groups-title">❥Groups I Collect</h3>
          {/* <Link to="/editgroups"> */}
          <button className="groups-button-edit">+Edit</button>
          {/* </Link> */}
        </div>
        <div>
          {this.props.isLoggedIn && this.props.faveGroups.length ? (
            <div className="groups-container">
              {this.props.faveGroups.map((group) => {
                return (
                  <div key={group.id}>
                    <Link to={`/group/${group.id}`}>
                      <button className="groups-single">{group.name}</button>
                    </Link>
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
