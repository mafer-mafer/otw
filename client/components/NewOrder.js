import React from "react";
import { connect } from "react-redux";
import { setOrders } from "../store/orders";
import { Link } from "react-router-dom";
import history from "../history";

export class NewOrder extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.id) {
      //   this.props.getOrders(this.props.auth.id);
    }
  }

  render() {
    return (
      <div className="after-scallop">
        <h3>
          <span className="title-groups">New Order:</span>
          <Link to="/orders">
            <span className="edit-groups">+Done</span>
          </Link>
        </h3>
        {/* {this.props.orders.length ? (
          <div>
            {this.props.orders.map((order) => {
              return (
                <Link to={`/orders/${order.id}`}>
                  <button key={order.id} className="all-orders-buttons">
                    <h3>Seller: {order.seller}</h3>
                    <h3>Platform: {order.platform}</h3>
                    <h3>Type: {order.type}</h3>
                    <h3>
                      Date Ordered:{" "}
                      {order.dateOrdered.toLocaleString("en-US", {
                        day: "numeric",
                        year: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <h3>On Hand: {order.onHand ? "Yes" : "No"}</h3>
                    {!order.onHand && order.onHandDate ? (
                      <h3>
                        On Hand Date:{" "}
                        {order.onHandDate.toLocaleString("en-US", {
                          day: "numeric",
                          year: "numeric",
                          month: "long",
                        })}
                      </h3>
                    ) : (
                      <span />
                    )}
                    <h3>Seller Location: {order.sellerLocation}</h3>
                    <h3>Shipping Type: {order.shippingType}</h3>
                    {order.trackingNumber ? (
                      <span />
                    ) : (
                      <h3>Tracking: {order.trackingNumber}</h3>
                    )}
                    <h3>Shipped?: {order.shipped ? "Yes" : "No"}</h3>
                    {order.shipped && order.dateShipped ? (
                      <>
                        <h3>
                          Date Shipped:{" "}
                          {order.dateShipped.toLocaleString("en-US", {
                            day: "numeric",
                            year: "numeric",
                            month: "long",
                          })}
                        </h3>{" "}
                        <h3>Arrived?: {order.arrived ? "Yes" : "No"}</h3>
                      </>
                    ) : (
                      <span />
                    )}
                    {order.arrived ? (
                      <h3>Proof Given?: {order.proofGiven ? "Yes" : "No"}</h3>
                    ) : (
                      <span />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        ) : (
          <h3>Seems like you have nothing on the way currently :0!</h3>
        )} */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    // getOrders: (id) => dispatch(setOrders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
