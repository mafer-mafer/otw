import React from "react";

export class EditGroupsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "(G)I-dle",
    };
    this.handleChange = this.handleChange.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  handleChange(e) {
    this.setState({ selected: e.target.value });
  }

  addFavorite() {
    console.log(this.state.selected, this.props.userId);
    this.props.addFaveGroup(this.state.selected, this.props.userId);
  }

  handleRemove(groupId) {
    this.props.removeFaveGroup(groupId, this.props.userId);
  }

  sortGroups(groups) {
    groups.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return groups;
  }

  render() {
    const { handleChange } = this;
    const { groupName } = this.state;

    return (
      <div className="edit-groups-form-main">
        <h4 id="groups-edit-title">Edit Favorite Groups</h4>
        {this.props.allGroups ? (
          <div className="groups-add-container">
            <div>
              <label htmlFor="groupName" id="groups-edit-allgroups-label">
                Choose Group
              </label>
              &nbsp;&nbsp;
              <select
                name="groupName"
                id="groups-edit-allgroups"
                onChange={handleChange}
                value={groupName}
                required
              >
                {this.sortGroups(this.props.allGroups).map((group, idx) => {
                  return (
                    <option value={group.name} key={idx}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              className="buttons"
              id="groups-button-add"
              onClick={this.addFavorite}
            >
              +Add Group!
            </button>
          </div>
        ) : (
          <h3>Error loading sorry!</h3>
        )}

        <br></br>
        <label id="groups-edit-allgroups-label">Current Favorite Groups</label>
        {this.props.faveGroups ? (
          <div className="edit-groups-faves-container">
            {this.props.faveGroups.map((group, idx) => {
              return (
                <table
                  className="tables"
                  id="edit-groups-fave"
                  key={idx}
                  onClick={() => this.handleRemove(group.id)}
                >
                  <tbody>
                    <tr>
                      <td>{group.name}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        ) : (
          <h3>Error loading sorry!</h3>
        )}
      </div>
    );
  }
}
export default EditGroupsForm;
