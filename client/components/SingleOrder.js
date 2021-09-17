import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSingleOrder } from "../store/singleOrder";
import axios from "axios";
import orders, { removeOrder } from "../store/orders";
import { setGroupNames } from "../store/groupNames";
import getTheName from "../api";
import FormContainer from "./FormContainer";

export class SingleOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      groupNames: {},
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrder(this.props.match.params.orderId);
      this.getName();
    }
  }

  getName() {
    if (this.props.order.items && this.props.order.items.length) {
      this.props.order.items.map((item) => {
        const name = getTheName(item.groupId);
        this.setState({
          ...this.state.groupNames,
          [item.groupId]: name,
        });
      });
    }
    console.log(this.state.groupNames);
  }

  handleDeleteClick() {
    this.props.deleteOrder(this.props.order.id, this.props.auth.id);
  }

  render() {
    let order = this.props.order;
    return (
      <div className="after-scallop">
        <div className="single-order-inner-nav">
          <Link to={`/orders`}>
            <span
              className="single-order-button-del"
              onClick={this.handleDeleteClick}
            >
              -Delete
            </span>
          </Link>
          <h3 id="single-order-title">Order Details</h3>
          <FormContainer
            userId={this.props.auth.id}
            handleSubmit={this.handleSubmit}
            fromEditOrder={true}
            fromNewOrder={false}
            buttonText={"+Edit"}
            order={this.props.order}
          />
          {/* ]          <Link to={`/orders/${order.id}/edit`}>
            <span className="single-order-button-edit">+Edit</span>
          </Link> */}
        </div>
        {this.props.order ? (
          <div className="single-order-container">
            <table className="single-order-table">
              <tbody>
                <tr>
                  <th id="orders-table-date">Date Ordered</th>
                  <th>Seller</th>
                  <th>Type</th>
                  <th id="orders-table-status">Status</th>
                </tr>
                <tr>
                  <td id="orders-table-date">{order.dateOrdered}</td>
                  <td>{order.seller}</td>
                  <td>{order.type}</td>
                  <td id="orders-table-status">{order.status}</td>
                </tr>
                <tr>
                  <th>Platform</th>
                  <th>Seller Location</th>
                  <th>Shipping Type</th>
                  <th>Tracking</th>
                </tr>
                <tr>
                  <td>{order.platform}</td>
                  <td>{order.sellerLocation}</td>
                  <td>{order.shippingType}</td>
                  <td>
                    {order.shippingType === "Stamped"
                      ? "NA"
                      : order.trackingNumber}
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>Items in this Order:</h2>
            <div className="single-order-items">
              {this.props.order.items && this.props.order.items.length ? (
                order.items.map((item) => {
                  return (
                    <table className="single-order-item" key={item.id}>
                      <tbody>
                        <tr>
                          <th>Description</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <td>{item.name}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>Group</th>
                          <th>Type</th>
                          <th>Pre-Order</th>
                          <th>Damage</th>
                        </tr>
                        <tr>
                          <td>{this.state.groupNames[item.id]}</td>
                          <td>{item.type}</td>
                          <td>{item.preOrder ? "Yes" : "No"}</td>
                          <td>{item.damage}</td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })
              ) : (
                <h4>Seems like there's no items in this order :0</h4>
              )}
            </div>
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
    groupNames: state.groupNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(setSingleOrder(id)),
    deleteOrder: (order) => dispatch(removeOrder(order)),
    // getGroupNames: (items) => dispatch(setGroupNames(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
