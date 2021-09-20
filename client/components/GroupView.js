import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import singleGroup, { setSingleGroup } from "../store/singleGroup";

export class GroupView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getGroup(
          this.props.match.params.groupId,
          this.props.auth.id
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.singleGroup.name);
    return (
      <div className="after-scallop">
        <h1>Specific Group Incoming {this.props.singleGroup.name} Orders</h1>
        <h3>Under Construction, Coming Soon :)</h3>
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
