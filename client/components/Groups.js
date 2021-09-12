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
        <h3>
          <span className="title-groups">Groups I Collect</span>
          <Link to="/editgroups">
            <span className="edit-groups">+Edit</span>
          </Link>
        </h3>
        {this.props.isLoggedIn && this.props.faveGroups.length ? (
          <div className="your-groups-container">
            {this.props.faveGroups.map((group) => {
              return (
                <p key={group.id} className="your-groups-single">
                  <Link to={`/group/${group.id}`}>
                    <button className="group-names">{group.name}</button>
                  </Link>
                </p>
              );
            })}
          </div>
        ) : this.props.isLoggedIn ? (
          <h3>Please Log In To Access Your Favorite Groups</h3>
        ) : (
          <h3>Add some fave groups!</h3>
        )}
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
