import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="header">
    <h1>
      <Link to="/home">On The Way! ○ ○ ○ ➲</Link>
    </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <h3>
            <Link to="/groups">Groups</Link>
            <Link to="/orders">Orders</Link>{" "}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <span id="nav-heart">♥&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </h3>
        </div>
      ) : (
        <h3>
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
          <span id="nav-heart">♥</span>
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
