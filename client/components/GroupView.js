import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSingleGroup } from "../store/singleGroup";

export class GroupView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getGroup(req.params.groupId, this.props.auth.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="after-scallop">
        <h1>Your Incoming {this.props.singleGroup.name} Orders</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    singleGroup: state.singleGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroup: (groupId, userId) => dispatch(setSingleGroup(groupId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
