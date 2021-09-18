import React from "react";
import {
  countries,
  orderType,
  orderStatus,
  sellerPlatform,
  typeShipping,
} from "../../script/selections";

export class EditOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: this.props.order.seller || "",
      platform: this.props.order.platform || "Twitter",
      status: this.props.order.status || "Order Placed",
      type: this.props.order.type || "Purchase",
      dateOrdered: this.props.order.dateOrdered || "",
      sellerLocation: this.props.order.sellerLocation || "Unknown",
      shippingType: this.props.order.shippingType || "Stamped",
      trackingNumber: this.props.order.trackingNumber || "",
      items: this.props.order.items || [],
      dateShipped: this.props.order.dateShipped || "",
      note: this.props.order.note || "",
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
    this.props.handleSubmit("Order", { ...this.state });
    this.props.closeModal();
  }

  render() {
    const { handleChange } = this;
    const {
      seller,
      dateOrdered,
      shippingType,
      trackingNumber,
      status,
      platform,
      sellerLocation,
      type,
      dateShipped,
      note,
    } = this.state;

    return (
      <div>
        <h4 className="new-order-title">Edit Order</h4>
        <form onSubmit={this.passSubmit}>
          <div className="new-order-field">
            <label htmlFor="type">Order Type:</label>&nbsp;&nbsp;
            <select name="type" onChange={handleChange} value={type}>
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
            <select name="status" onChange={handleChange} value={status}>
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
            <select name="platform" onChange={handleChange} value={platform}>
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
            <select
              name="sellerLocation"
              onChange={handleChange}
              value={sellerLocation}
            >
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
            <select
              name="shippingType"
              onChange={handleChange}
              value={shippingType}
            >
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
export default EditOrderForm;
