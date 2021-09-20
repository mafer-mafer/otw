import React from "react";
import { allGroups, itemType } from "../../script/selections";

export class NewItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "Photocard",
      preOrder: "false",
      damage: "",
      groupName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.passSubmit = this.passSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  passSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit({ ...this.state });
    this.props.closeModal();
  }

  render() {
    console.log(this.state);
    const { handleChange } = this;
    const { name, type, preOrder, damage, groupName } = this.state;

    return (
      <div>
        <h4 className="new-order-title">New Item</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="name">Item Description:</label>&nbsp;&nbsp;
            <input name="name" onChange={handleChange} value={name} required />
          </div>
          <br></br>
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
export default NewItemForm;
