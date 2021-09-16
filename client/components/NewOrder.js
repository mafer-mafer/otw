import React from "react";
import { connect } from "react-redux";
import { setOrders } from "../store/orders";
import { Link } from "react-router-dom";
import history from "../history";
import { countries } from "../../script/countries";
import { addNewOrder } from "../store/singleOrder";

export class NewOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      seller: "",
      platform: "Twitter",
      type: "Purchase",
      dateOrdered: "",
      onHand: false,
      onHandDate: null,
      sellerLocation: "Unknown",
      shippingType: "Stamped",
      tracking: "",
      shipped: false,
      dateShipped: null,
      arrived: false,
      proofGiven: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.auth.id) {
  //     //   this.props.getOrders(this.props.auth.id);
  //   }
  // }

  handleChange(e) {
    if (e.target.value === "false") {
      this.setState({
        [e.target.name]: true,
      });
    } else if (e.target.value === "true") {
      this.setState({
        [e.target.name]: false,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createOrder({ ...this.state }, this.props.auth.id);
  }

  render() {
    const {
      seller,
      sellerLocation,
      type,
      platform,
      dateOrdered,
      onHand,
      onHandDate,
      shipped,
      shippedDate,
      shippingType,
      tracking,
      arrived,
      proofGiven,
    } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className="after-scallop">
        <h3>
          <span className="title-groups">New Order:</span>
          <Link to="/orders">
            <span className="edit-groups">Cancel</span>
          </Link>
        </h3>
        <form id="new-order" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="seller">Seller:</label>
            <input name="seller" onChange={handleChange} value={seller} />
          </div>
          <br></br>
          <div>
            <label htmlFor="platform">Platform:</label>
            <select name="platform" onChange={handleChange}>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
              <option value="eBay">eBay</option>
              <option value="Mercari">Mercari</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <br></br>
          <div>
            <label htmlFor="type">Seller's Location:</label>
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
          <div>
            <label htmlFor="type">Type:</label>
            <select name="type" onChange={handleChange}>
              <option value="Purchase">Purchase</option>
              <option value="Trade">Trade</option>
              <option value="Group Order">Group Order</option>
            </select>
          </div>
          <br></br>
          <div>
            <label htmlFor="dateOrdered">Date Ordered:</label>
            <input
              type="date"
              id="dateOrdered"
              name="dateOrdered"
              value={dateOrdered}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div className="type-radio">
            <span>On Hand:</span>
            <br></br>
            <input
              id="on-hand-checkbox"
              type="checkbox"
              name="onHand"
              onChange={handleChange}
              value={onHand}
            />
          </div>
          {onHand ? (
            <div>
              <label htmlFor="dateOrdered">On Hand Date:</label>
              <input
                type="date"
                id="onHandDate"
                name="onHandDate"
                value={onHandDate}
                onChange={handleChange}
              />
            </div>
          ) : (
            <span />
          )}
          <br></br>
          <div>
            <label htmlFor="shippingType">Shipping Type:</label>
            <select name="shippingType" onChange={handleChange}>
              <option value="Stamped">Stamped</option>
              <option value="Tracked">Tracked</option>
              <option value="EMS">EMS</option>
              <option value="DHL">DHL</option>
              <option value="Boat">Boat</option>
            </select>
          </div>
          <br></br>
          <div>
            <span>Order Shipped?</span>
            <br></br>
            <input
              type="checkbox"
              name="shipped"
              onChange={handleChange}
              value={shipped}
            />
          </div>
          <br></br>
          {shipped ? (
            <div>
              <label htmlFor="dateShipped">Shipping Date:</label>
              <input
                type="date"
                id="shippedDate"
                name="shippedDate"
                value={shippedDate}
                onChange={handleChange}
              />
            </div>
          ) : (
            <span></span>
          )}
          {shippingType !== "Stamped" ? (
            <div>
              <label htmlFor="tracking">Tracking:</label>
              <input name="tracking" onChange={handleChange} value={tracking} />
            </div>
          ) : (
            <span></span>
          )}
          <div>
            <span>Order Arrived?</span>
            <br></br>
            <input
              type="checkbox"
              name="arrived"
              onChange={handleChange}
              value={arrived}
            />
          </div>
          <br></br>
          <div>
            <span>Proof Sent to Seller?</span>
            <br></br>
            <input
              type="checkbox"
              name="proofGiven"
              onChange={handleChange}
              value={proofGiven}
            />
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    // orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrder: (newOrderData, user) =>
      dispatch(addNewOrder(newOrderData, user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
