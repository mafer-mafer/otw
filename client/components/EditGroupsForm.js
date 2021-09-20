import React from "react";
import { allGroups } from "../../script/selections";

export class EditGroupsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faveGroups: this.props.groups || [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.passSubmit = this.passSubmit.bind(this);
  }

  handleChange(e) {
    // this.setState({
    //   faveGroups: [...this.state.faveGroups]
    // });
  }

  passSubmit(e) {
    // e.preventDefault();
    // this.props.handleSubmit("Item", { ...this.state }, this.props.item.id);
    // this.props.closeModal();
  }

  render() {
    console.log(this.state);
    const { handleChange } = this;
    const { name, type, preOrder, damage, groupName } = this.state;

    return (
      <div>
        <h4 className="new-order-title">Edit Item</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="groupName">Group:</label>&nbsp;&nbsp;
            <select
              name="groupName"
              onChange={handleChange}
              value={groupName}
              required
            >
              {allGroups.map((group, idx) => {
                return (
                  <option value={group} key={idx}>
                    {group}
                  </option>
                );
              })}
            </select>
          </div>
          <br></br>

          <br></br>
          <div>
            <p>
              <button type="submit">Submit</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
export default EditGroupsForm;
