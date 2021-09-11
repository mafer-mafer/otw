import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFaveGroups } from "../store/faveGroups";
import { setGroups } from "../store/allGroups";
import classNames from "classnames";

export class EditGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "",
    };
    this.chooseType = this.chooseType.bind(this);
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getFaveGroups(this.props.auth.id);
      }
      this.props.loadGroups("girl");
    } catch (error) {
      console.log(error);
    }
  }

  chooseType(e) {
    this.props.loadGroups(e);
  }

  selectGroup(name) {
    if (this.state.selected === name) {
      this.setState({ selected: "" });
    } else {
      this.setState({ selected: name });
    }
  }

  render() {
    return (
      <div className="after-scallop">
        <div className="edit-groups-container">
          <div className="all-groups">
            <h3>All Groups:</h3>
            <div className="dropdown">
              <button onClick={() => this.chooseType("girl")}>
                Girl Groups
              </button>
              <button onClick={() => this.chooseType("boy")}>Boy Groups</button>
            </div>
            <div>
              {this.props.allGroups.length ? (
                this.props.allGroups.map((group) => {
                  return (
                    <h5
                      key={group.id}
                      onClick={() => this.selectGroup(group.name)}
                      className={classNames({
                        "selected-group": this.state.selected === group.name,
                      })}
                    >
                      {group.name}
                    </h5>
                  );
                })
              ) : (
                <h4>Error happened loading sorry :(</h4>
              )}
            </div>
          </div>
          <div className="swap-groups">
            <h4>Add→</h4>
            <h4>←Remove</h4>
          </div>
          <div className="all-groups">
            <h3>You Collect:</h3>
            <div>
              {this.props.faveGroups.length ? (
                <div>
                  {this.props.faveGroups.map((group) => {
                    return (
                      <h4
                        key={group.id}
                        onClick={() => this.selectGroup(group.name)}
                        className={classNames({
                          "selected-group": this.state.selected === group.name,
                        })}
                      >
                        {group.name}
                      </h4>
                    );
                  })}
                </div>
              ) : (
                <h4>Try Adding a group!</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    faveGroups: state.faveGroups,
    allGroups: state.allGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFaveGroups: (id) => dispatch(setFaveGroups(id)),
    loadGroups: (type) => dispatch(setGroups(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroups);
