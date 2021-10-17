import React from "react";
import { itemType } from "../../script/selections";

export class EditItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name || "",
      type: this.props.item.type || itemType[0],
      preOrder: this.props.item.preOrder || "false",
      damage: this.props.item.damage || "",
      groupId: this.props.item.groupId || "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.passSubmit = this.passSubmit.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  passSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit("Item", { ...this.state }, this.props.item.id);
    this.props.closeModal();
  }

  render() {
    const { handleChange } = this;
    const { name, type, preOrder, damage, groupId } = this.state;

    return (
      <div>
        <h4 id="new-order-title">Edit Item</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="name">Item Description:</label>&nbsp;&nbsp;
            <input name="name" onChange={handleChange} value={name} required />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="groupId">Group:</label>&nbsp;&nbsp;
            <select
              name="groupId"
              onChange={handleChange}
              value={groupId}
              required
            >
              <option disabled>Favorite Groups</option>
              {this.props.faveGroups.map((group, idx) => {
                return (
                  <option value={group.id} key={idx}>
                    {group.name}
                  </option>
                );
              })}
              <option disabled>All Groups</option>
              {this.sortGroups(this.props.allGroups, this.props.faveGroups).map(
                (group, idx) => {
                  return (
                    <option value={group.id} key={idx}>
                      {group.name}
                    </option>
                  );
                }
              )}
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="type">Type:</label>&nbsp;&nbsp;
            <select name="type" onChange={handleChange} value={type} required>
              {itemType.map((type, idx) => {
                return (
                  <option value={type} key={idx}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="type">PreOrder:</label>&nbsp;&nbsp;
            <select
              name="preOrder"
              onChange={handleChange}
              value={preOrder}
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="damage">Damage:</label>&nbsp;&nbsp;
            <input name="damage" onChange={handleChange} value={damage} />
          </div>
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
export default EditItemForm;
