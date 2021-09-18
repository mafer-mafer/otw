import React from "react";

export class EditItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name || "",
      type: this.props.item.type || "Photocard",
      preOrder: this.props.item.preOrder || "false",
      damage: this.props.item.damage || "",
      groupName: this.props.item.groupName || "",
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
    this.props.handleSubmit("Item", { ...this.state }, this.props.item.id);
    this.props.closeModal();
  }

  render() {
    console.log(this.state);
    const { handleChange } = this;
    const { name, type, preOrder, damage, groupName } = this.state;

    return (
      <div>
        <h4 className="new-order-title">Edit Order</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="name">Item Description:</label>&nbsp;&nbsp;
            <input name="name" onChange={handleChange} value={name} required />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="groupName">Group:</label>&nbsp;&nbsp;
            <input
              name="groupName"
              onChange={handleChange}
              value={groupName}
              required
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="type">Type:</label>&nbsp;&nbsp;
            <select name="type" onChange={handleChange} value={type} required>
              <option value="Photocard">Photocard</option>
              <option value="Album">Album</option>
              <option value="Lightstick">Lightstick</option>
              <option value="Concert">Concert</option>
              <option value="Misc.">Misc.</option>
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
