import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Orders from "./components/Orders";
import Groups from "./components/Groups";
import EditGroups from "./components/EditGroups";
import GroupView from "./components/GroupView";
import SingleOrder from "./components/SingleOrder";
import EditOrder from "./components/EditOrder";
import NewOrder from "./components/NewOrder";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/orders/new" component={NewOrder} />
            <Route path="/orders/:orderId/edit" component={EditOrder} />
            <Route path="/orders/:orderId" component={SingleOrder} />
            <Route path="/orders" component={Orders} />
            <Route path="/groups" component={Groups} />
            <Route path="/editgroups" component={EditGroups} />
            <Route path="/group/:groupId" component={GroupView} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
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
