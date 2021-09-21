import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Orders from "./components/Orders";
import Groups from "./components/Groups";
import GroupView from "./components/GroupView";
import SingleOrder from "./components/SingleOrder";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="after-header">
        {isLoggedIn ? (
          <Switch>
            <Route path="/orders/:orderId" component={SingleOrder} />
            <Route path="/orders" component={Orders} />
            <Route path="/groups" component={Groups} />
            <Route path="/group/:groupId" component={GroupView} />
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
