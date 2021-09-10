import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="scallop">
    <h1>OnTheWay! </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <h3>
            <Link to="/home">Home</Link>
            <Link to="/orders">Orders</Link>{" "}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </h3>
      )}
    </nav>
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
