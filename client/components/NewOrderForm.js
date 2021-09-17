import React from "react";
import { countries } from "../../script/countries";
import { connect } from "react-redux";

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
      tracking: "",
    };
    this.handleChange = this.handleChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //   handleSubmit(e) {
  //     e.preventDefault();
  //     this.props.createOrder({ ...this.state }, this.props.auth.id);
  //   }

  render() {
    console.log(this.state);
    const { handleChange } = this;
    const { seller, dateOrdered, shippingType, tracking } = this.state;

    return (
      <div>
        <h4 className="new-order-title">Add New Order</h4>
        <form onSubmit={this.props.handleChangeSubmit}>
          <div className="new-order-field">
            <label htmlFor="type">Type:</label>&nbsp;&nbsp;
            <select name="type" onChange={handleChange}>
              <option value="Purchase">Purchase</option>
              <option value="Trade">Trade</option>
              <option value="Group Order">Group Order</option>
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="status">Status:</label>&nbsp;&nbsp;
            <select name="status" onChange={handleChange}>
              <option value="Order Placed">Order Placed</option>
              <option value="Waiting for Shipment">Waiting for Shipment</option>
              <option value="Waiting for Pre-Order Release">
                Waiting for Pre-Order Release
              </option>
              <option value="Waiting for Seller to Receive">
                Waiting for Seller to Receive
              </option>
              <option value="Waiting for GOM to Receive">
                Waiting for GOM to Receive
              </option>
              <option value="Waiting for Proxy to Ship">
                Waiting for Proxy to Ship
              </option>
              <option value="Waiting for GOM to Ship">
                Waiting for GOM to Ship
              </option>
              <option value="Waiting for K Address to Ship">
                Waiting for K Address to Ship
              </option>
              <option value="Waiting for J Address to Ship">
                Waiting for J Address to Ship
              </option>
              <option value="Waiting for C Address to Ship">
                Waiting for C Address to Ship
              </option>
              <option value="Waiting for USA Address to Ship">
                Waiting for USA Address to Ship
              </option>
              <option value="Seller On Hitaus">Seller On Hitaus</option>
              <option value="Shipped">Shipped</option>
              <option value="Shipped to Seller">Shipped to Seller</option>
              <option value="Shipped to GOM">Shipped to GOM</option>
              <option value="Shipped to Proxy">Shipped to Proxy</option>
              <option value="Shipped to K Address">Shipped to K Address</option>
              <option value="Shipped to J Address">Shipped to J Address</option>
              <option value="Shipped to C Address">Shipped to C Address</option>
              <option value="Shipped to USA Address">
                Shipped to USA Address
              </option>
              <option value="In Customs">In Customs</option>
              <option value="Arrived">Arrived</option>
              <option value="Arrived to Proxy">Arrived to Proxy</option>
              <option value="Arrived at K Address">Arrived at K Address</option>
              <option value="Arrived at J Address">Arrived at J Address</option>
              <option value="Arrived at C Address">Arrived at C Address</option>
              <option value="Arrived at USA Address">
                Arrived at USA Address
              </option>
              <option value="Proof Sent">Proof Sent</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="seller">Seller:</label>&nbsp;&nbsp;
            <input name="seller" onChange={handleChange} value={seller} />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="platform">Platform:</label>&nbsp;&nbsp;
            <select name="platform" onChange={handleChange}>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
              <option value="eBay">eBay</option>
              <option value="Mercari">Mercari</option>
              <option value="Other">Other</option>
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
            />
          </div>
          <br></br>
          <div className="new-order-field">
            <label htmlFor="shippingType">Shipping Type:</label>
            &nbsp;&nbsp;
            <select name="shippingType" onChange={handleChange}>
              <option value="Stamped">Stamped</option>
              <option value="Tracked">Tracked</option>
              <option value="EMS">EMS</option>
              <option value="DHL">DHL</option>
              <option value="Boat">Boat</option>
            </select>
          </div>
          <br></br>
          {shippingType !== "Stamped" ? (
            <div className="new-order-field">
              <label htmlFor="tracking">Tracking:</label>&nbsp;&nbsp;
              <input name="tracking" onChange={handleChange} value={tracking} />
              <br></br>
            </div>
          ) : (
            <span></span>
          )}
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
