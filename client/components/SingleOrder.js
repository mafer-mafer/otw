import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSingleOrder } from "../store/singleOrder";
import axios from "axios";
import { removeOrder } from "../store/orders";
//import getName from "../api";

export class SingleOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      groupNames: [],
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrder(this.props.match.params.orderId);
      this.setState({ items: this.props.order.items });
      // if (this.props.order) {
      //   this.getName();
      // }
    }
  }

  getName() {
    // console.log("here");
    // let theGroupNames = [];
    // this.state.items.map((item) => {
    //   theGroupNames[item.id] = getTheName(item.id);
    // });
    // this.setState({ groupNames: theGroupNames });
    // const getTheName = async (id) => {
    //   try {
    //     let { data } = await axios.get(`/api/groups/name/${id}`);
    //     return data.name;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // let name = "";
    // const getTheName = async (id) => {
    //   try {
    //     let { data } = await axios.get(`/api/groups/name/${id}`);
    //     console.log(data.name);
    //     name = data.name;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getTheName(id);
    // return name;
  }

  handleDeleteClick() {
    this.props.deleteOrder(this.props.order.id, this.props.auth.id);
  }

  render() {
    // console.log(this.state);
    // if (this.state.order.items) {
    //   this.getName();
    // }
    let order = this.props.order;
    return (
      <div className="after-scallop">
        <h3>
          <span className="title-groups">Order Details</span>
          <Link to={`/orders/${order.id}/edit`}>
            <span className="edit-groups">+Edit</span>
          </Link>
          <Link to={`/orders`}>
            <span className="edit-groups" onClick={this.handleDeleteClick}>
              -Delete
            </span>
          </Link>
        </h3>
        {this.props.order ? (
          <div>
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
            <h3>Items in this Order:</h3>
            {this.props.order.items && this.props.order.items.length ? (
              order.items.map((item) => {
                return (
                  <button className="all-orders-button" key={item.id}>
                    <h3>Group: {this.state.groupNames[item.id]}</h3>
                    <h3>Item: {item.name}</h3>
                    <h3>Type: {item.type}</h3>
                    <h3>PreOrder: {item.preOrder ? "Yes" : "No"}</h3>
                    {item.preOrder ? (
                      <h3>Release Date: {item.releaseDate}</h3>
                    ) : (
                      <span />
                    )}
                    <h3>Damage: {item.damage}</h3>
                  </button>
                );
              })
            ) : (
              <h4>Seems like there's no items in this order :0</h4>
            )}
          </div>
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
    deleteOrder: (order) => dispatch(removeOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
