import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { countries } from "../../script/selections";

export class AuthEditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h4>Under Construction</h4>
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
    // goAuth: (username, password, formName) =>
    //   dispatch(authenticate(username, password, formName)),
  };
};

export default connect(mapState, mapDispatch)(AuthEditForm);
