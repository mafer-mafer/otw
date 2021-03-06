import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="header">
    <div>
      {" "}
      <h1>
        <Link to="/home">K - On The Way! ○ ○ ○ ➲</Link>
      </h1>
    </div>
    <div>
      {" "}
      <nav>
        {isLoggedIn ? (
          <div>
            <h3>
              <Link to="/groups">Groups</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/profile">
                <span id="nav-smaller">Profile</span>
              </Link>
              <Link to="/about">
                <span id="nav-smaller">About</span>
              </Link>
              <a href="#" onClick={handleClick}>
                <span id="nav-smaller">Logout</span>
              </a>
              <span className="tooltiptext">♥&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </h3>
          </div>
        ) : (
          <h3>
            <span id="nav-heart">♥&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </h3>
        )}
      </nav>
    </div>
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
