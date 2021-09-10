import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  const { username } = props;

  return (
    <div className="after-scallop">
      <h3>Welcome back, {username} :)</h3>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
