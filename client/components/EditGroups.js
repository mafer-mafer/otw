import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFaveGroups } from "../store/faveGroups";

export class EditGroups extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getFaveGroups(this.props.auth.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.faveGroups);
    return (
      <div className="after-scallop">
        <div className="edit-groups-container">
          <div className="all-groups">All Groups:</div>
          <div className="all-groups">
            You Collect:
            <div>
              {this.props.faveGroups.length ? (
                <div>
                  {this.props.faveGroups.map((group) => {
                    return <h4 key={group.id}>{group.name}</h4>;
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFaveGroups: (id) => dispatch(setFaveGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroups);
