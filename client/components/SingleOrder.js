import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSingleOrder } from "../store/singleOrder";

export class SingleOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrder(this.props.match.params.orderId);
      this.setState({ items: this.props.order.items });
    }
  }

  render() {
    console.log(this.props.order.items);
    let order = this.props.order;
    return (
      <div className="after-scallop">
        <h3>
          <span className="title-groups">Order Details</span>
          <Link to={`/orders/${order.id}/edit`}>
            <span className="edit-groups">+Edit</span>
          </Link>
        </h3>
        {this.props.order ? (
          <button key={order.id} className="all-orders-buttons">
            <h3>Seller: {order.seller}</h3>
            <h3>Platform: {order.platform}</h3>
            <h3>Type: {order.type}</h3>
            <h3>Date Ordered: {order.dateOrdered}</h3>
            <h3>On Hand: {order.onHand ? "Yes" : "No"}</h3>
            {!order.onHand && order.onHandDate ? (
              <h3>On Hand Date: {order.onHandDate}</h3>
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
              <h3>
                Date Shipped: {order.dateShipped}
                <br></br>
                Arrived?: {order.arrived ? "Yes" : "No"}
              </h3>
            ) : (
              <span />
            )}
            {order.arrived ? (
              <h3>Proof Given?: {order.proofGiven ? "Yes" : "No"}</h3>
            ) : (
              <span />
            )}
          </button>
        ) : (
          <h3>Something went wrong w this order :0!</h3>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    order: state.singleOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(setSingleOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
