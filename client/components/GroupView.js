import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class GroupView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="after-scallop">
        <h1>Your Incoming {} Orders</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    //faveGroups: state.faveGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (id) => dispatch(setOrders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
