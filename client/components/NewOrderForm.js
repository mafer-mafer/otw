import React from "react";
import {
  countries,
  orderType,
  orderStatus,
  sellerPlatform,
  typeShipping,
} from "../../script/selections";

export class NewOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      platform: "Twitter",
      status: "Order Placed",
      type: "Purchase",
      dateOrdered: "",
      sellerLocation: "Unknown",
      shippingType: "Stamped",
      trackingNumber: "",
      dateShipped: "",
      note: "",
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
  }

  render() {
    const { handleChange } = this;
    const { seller, dateOrdered, dateShipped, trackingNumber, note } =
      this.state;

    return (
      <div>
        <h4 id="new-order-title">Add New Order</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="type">Order Type:</label>&nbsp;&nbsp;
            <select name="type" onChange={handleChange}>
              {orderType.map((type, idx) => {
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
            <label htmlFor="status">Order Status:</label>&nbsp;&nbsp;
            <select name="status" onChange={handleChange}>
              {orderStatus.map((status, idx) => {
                return (
                  <option value={status} key={idx}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="seller">Seller:</label>&nbsp;&nbsp;
            <input
              name="seller"
              onChange={handleChange}
              value={seller}
              required
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="platform">Platform:</label>&nbsp;&nbsp;
            <select name="platform" onChange={handleChange}>
              {sellerPlatform.map((platform, idx) => {
                return (
                  <option value={platform} key={idx}>
                    {platform}
                  </option>
                );
              })}
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="type">Seller's Location:</label>&nbsp;&nbsp;
            <select name="sellerLocation" onChange={handleChange}>
              <option value="Unkown">Unknown</option>
              {countries.map((country, idx) => {
                return (
                  <option value={`${country}`} key={idx}>{`${country}`}</option>
                );
              })}
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="dateOrdered">Date Ordered:</label>&nbsp;&nbsp;
            <input
              type="date"
              id="dateOrdered"
              name="dateOrdered"
              value={dateOrdered}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="shippingType">Shipping Type:</label>
            &nbsp;&nbsp;
            <select name="shippingType" onChange={handleChange}>
              {typeShipping.map((type, idx) => {
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
            <label htmlFor="dateShipped">Date Shipped:</label>&nbsp;&nbsp;
            <input
              type="date"
              id="dateShipped"
              name="dateShipped"
              value={dateShipped}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="trackingNumber">Tracking:</label>&nbsp;&nbsp;
            <input
              name="trackingNumber"
              onChange={handleChange}
              value={trackingNumber}
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="note">Note:</label>&nbsp;&nbsp;
            <input name="note" onChange={handleChange} value={note} />
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
export default NewOrderForm;
