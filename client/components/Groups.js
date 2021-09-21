import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import {
  addFaveGroup,
  removeFaveGroup,
  setFaveGroups,
} from "../store/faveGroups";
import { setGroups } from "../store/allGroups";

export class Groups extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.doneEditing = this.doneEditing.bind(this);
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getFaveGroups(this.props.auth.id);
        this.props.loadGroups();
      }
    } catch (error) {
      console.log(error);
    }
  }

  doneEditing() {
    window.location.reload();
  }

  render() {
    return (
      <div className="groups-main-container">
        <div className="groups-inner-nav">
          <div id="groups-nav-side"></div>
          <h3 className="groups-title">Groups I Collect</h3>
          <div id="groups-nav-side">
            <FormContainer
              userId={this.props.auth.id}
              handleSubmit={this.handleSubmit}
              purpose="EditGroups"
              buttonText="+Edit"
              faveGroups={this.props.faveGroups}
              allGroups={this.props.allGroups}
              doneEditing={this.doneEditing}
              removeFaveGroup={this.props.removeFavorite}
              addFaveGroup={this.props.addFavorite}
            />
          </div>
        </div>
        <div className="groups-all">
          {this.props.isLoggedIn && this.props.faveGroups.length ? (
            <div className="groups-body-container">
              {this.props.faveGroups.map((group) => {
                return (
                  <div key={group.id} className="groups-single-container">
                    <div className="groups-hearts">
                      <div>
                        <span id="group-heart-pink">♥</span>
                        <br></br>
                        <span id="group-heart-mint">♥</span>
                      </div>
                    </div>
                    <div>
                      <Link to={`/group/${group.id}`}>
                        <table className="tables" id="groups-single-table">
                          <tbody>
                            <tr>
                              <th>&nbsp;</th>
                            </tr>
                            <tr>
                              <td>{group.name}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : this.props.isLoggedIn ? (
            <div>
              <br></br>
              <br></br>
              <h2>Add some fave groups with the +Edit Button!</h2>
            </div>
          ) : (
            <div>
              <br></br>
              <br></br>
              <h2>Please Log In To Access Your Favorite Groups</h2>
            </div>
          )}
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
    loadGroups: () => dispatch(setGroups()),
    addFavorite: (groupName, user) => dispatch(addFaveGroup(groupName, user)),
    removeFavorite: (group, user) => dispatch(removeFaveGroup(group, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
