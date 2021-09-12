import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFaveGroup,
  removeFaveGroup,
  setFaveGroups,
} from "../store/faveGroups";
import { setGroups } from "../store/allGroups";
import classNames from "classnames";

export class EditOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: {},
      selectedType: "",
    };
    this.chooseType = this.chooseType.bind(this);
    this.getFaveNames = this.getFaveNames.bind(this);
    this.filterRepeats = this.filterRepeats.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    try {
      //   if (this.props.auth.id) {
      //     this.props.getFaveGroups(this.props.auth.id);
      //   }
      //   this.props.loadGroups("girl", this.getFaveNames());
    } catch (error) {
      console.log(error);
    }
  }

  chooseType(e) {
    this.props.loadGroups(e, this.getFaveNames());
  }

  getFaveNames() {
    let faves = [];
    for (let key in this.props.faveGroups) {
      faves.push(this.props.faveGroups[key].name);
    }
    return faves;
  }

  filterRepeats() {
    let faves = this.getFaveNames();
    let groups = this.props.allGroups.filter((x) => !faves.includes(x.name));
    return groups;
  }

  selectGroup(group, type) {
    if (this.state.selected.name === group.name) {
      this.setState({ selected: {}, selectedType: type });
    } else {
      this.setState({ selected: group, selectedType: type });
    }
  }

  addFavorite() {
    if (this.state.selected !== {} && this.state.selectedType === "all") {
      this.props.addFavorite(this.state.selected.id, this.props.auth.id);
    }
    this.setState({ selected: {}, selectedType: "" });
  }

  removeFavorite() {
    if (this.state.selected !== {} && this.state.selectedType === "fave") {
      this.props.removeFavorite(this.state.selected.id, this.props.auth.id);
    }
    this.setState({ selected: {}, selectedType: "" });
  }

  render() {
    return (
      <div className="after-scallop">
        <h3>
          <span className="title-groups">Edit Order</span>
          <Link to="/orders">
            <span className="edit-groups">Done</span>
          </Link>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    // faveGroups: state.faveGroups,
    // allGroups: state.allGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getFaveGroups: (id) => dispatch(setFaveGroups(id)),
    // loadGroups: (type) => dispatch(setGroups(type)),
    // addFavorite: (group, user) => dispatch(addFaveGroup(group, user)),
    // removeFavorite: (group, user) => dispatch(removeFaveGroup(group, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
