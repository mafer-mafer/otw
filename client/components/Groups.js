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
    console.log(this.props.faveGroups);
    return (
      <div className="after-scallop">
        <h3>Your Favorite Groups</h3>
        {this.props.isLoggedIn && this.props.faveGroups.length ? (
          <div>
            {this.props.faveGroups.map((group) => {
              return <h4 key={group.id}>{group.name}</h4>;
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
