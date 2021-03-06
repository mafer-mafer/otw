import React from "react";
import { connect } from "react-redux";
import { setSingleOrder, editOrder } from "../store/singleOrder";
import { removeOrder } from "../store/orders";
import FormContainer from "./FormContainer";
import history from "../history";
import { removeItem, editItem, addItem } from "../store/items";
import { setGroups } from "../store/allGroups";
import { setFaveGroups } from "../store/faveGroups";
import { setTracking } from "../store/tracking";
import { findAllGroupNames } from "../store/groupName";

export class SingleOrder extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.trackOrder = this.trackOrder.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrder(this.props.match.params.orderId);
      this.props.getFaveGroups(this.props.auth.id);
      this.props.loadGroups();
    }
  }

  handleSubmit(state) {
    this.props.newItem(state, this.props.order.id);
    window.location.reload();
    window.location.reload();
  }

  handleDelete(type, itemId) {
    var result = confirm(
      `Are you sure you want to delete this ${type}? This change is permanent :0!`
    );
    if (result && type === "Order") {
      this.props.deleteOrder(this.props.order.id, this.props.auth.id);
      history.push(`/orders/`);
    } else if (result && type == "Item") {
      this.props.deleteItem(itemId);
      window.location.reload();
    }
  }

  handleEdit(type, state, id) {
    if (type === "Order") {
      this.props.editOrder(this.props.order.id, { ...state });
      window.location.reload();
    } else if (type === "Item") {
      this.props.editItem(id, { ...state });
      window.location.reload();
    }
  }

  trackOrder() {
    this.props.getTracking(this.props.order.trackingNumber);
    console.log(this.props.tracking);
  }

  render() {
    let order = this.props.order;
    if (this.props.items.length && !this.props.groupName.length) {
      this.props.getName(this.props.items);
    }
    return (
      <div className="single-order-main-container">
        <div className="single-order-left">
          {/* <div className="single-order-hearts">
            <div>
              <span id="orders-heart-1">???</span>
              <br></br>
              <span id="orders-heart-2">???</span>
              <br></br>
              <span id="orders-heart-3">???</span>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div> */}
          <div className="single-order-left-order">
            <h3 id="single-order-title">Your Order</h3>
            {this.props.order ? (
              <div className="single-order-left-order-container">
                <table className="tables" id="single-order-table">
                  <tbody>
                    <tr>
                      <th>Date Ordered</th>
                      <th>Order Type</th>
                      <th>Status</th>
                    </tr>
                    <tr>
                      <td>{order.dateOrdered}</td>
                      <td>{order.type}</td>
                      <td>{order.status}</td>
                    </tr>
                    <tr>
                      <th>Seller</th>
                      <th>Platform</th>
                      <th>Location</th>
                    </tr>
                    <tr>
                      <td>{order.seller}</td>
                      <td>{order.platform}</td>
                      <td>{order.sellerLocation}</td>
                    </tr>
                    <tr>
                      <th>Mailing Company</th>
                      <th>Shipping Type</th>
                      <th>Tracking</th>
                    </tr>
                    <tr>
                      <td>Coming Soon</td>
                      <td>{order.shippingType}</td>
                      <td>
                        {order.shippingType === "Stamped"
                          ? "NA"
                          : order.trackingNumber}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Notes</th>
                    </tr>
                    <tr>
                      {order.note ? (
                        <td colSpan="3">{order.note}</td>
                      ) : (
                        <td colSpan="3">&nbsp;</td>
                      )}
                    </tr>
                  </tbody>
                </table>
                <div id="single-order-buttons-container">
                  <FormContainer
                    userId={this.props.auth.id}
                    handleSubmit={this.handleEdit}
                    purpose={"EditOrder"}
                    buttonText={"+Edit Order"}
                    order={this.props.order}
                  />
                  <div id="form-container-div">
                    <button
                      className="buttons purple"
                      id="single-order-del"
                      onClick={() => this.handleDelete("Order")}
                    >
                      -Delete Order
                    </button>
                  </div>
                  {/* <button
                    className="buttons"
                    id="single-order-button-del"
                    onClick={this.trackOrder}
                  >
                    Track Order
                  </button> */}
                </div>
              </div>
            ) : (
              <h3>Loading!~~~</h3>
            )}
          </div>
        </div>
        {this.props.order ? (
          <div className="single-order-right">
            <div className="single-order-right-nav">
              <div className="single-right-nav-side"></div>
              <h2 id="single-order-items-title">Order Items</h2>
              <div className="single-right-nav-side">
                <FormContainer
                  handleSubmit={this.handleSubmit}
                  purpose={"NewItem"}
                  buttonText={"+New Item"}
                  faveGroups={this.props.faveGroups}
                  allGroups={this.props.allGroups}
                />
              </div>
            </div>
            <div className="single-order-items-container">
              {this.props.order.items && this.props.order.items.length ? (
                order.items.map((item, idx) => {
                  return (
                    <div key={item.id} className="single-order-item-container">
                      <table className="tables" id="single-order-item-table">
                        <tbody>
                          <tr>
                            <th>Group</th>
                            <th colSpan="2">Item Description</th>
                          </tr>
                          <tr>
                            <td>{this.props.groupName[idx]}</td>
                            <td colSpan="2">{item.name}</td>
                          </tr>
                          <tr>
                            <th>Type</th>
                            <th>Pre-Order</th>
                            <th>Damage?</th>
                          </tr>
                          <tr>
                            <td>{item.type}</td>
                            <td>{item.preOrder ? "Yes" : "No"}</td>
                            <td>{item.damage}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="single-order-item-buttons-container">
                        <FormContainer
                          userId={this.props.auth.id}
                          handleSubmit={this.handleEdit}
                          purpose={"EditItem"}
                          buttonText={"+Edit"}
                          order={this.props.order}
                          item={item}
                          faveGroups={this.props.faveGroups}
                          allGroups={this.props.allGroups}
                        />
                        <div id="form-container-div">
                          <button
                            className="buttons purple"
                            id="single-order-item-del"
                            onClick={() => this.handleDelete("Item", item.id)}
                          >
                            -Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h4>Seems like there's no items in this order :0</h4>
              )}
            </div>
          </div>
        ) : (
          <h3>Loading!~~~</h3>
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
    items: state.items,
    faveGroups: state.faveGroups,
    allGroups: state.allGroups,
    tracking: state.tracking,
    groupName: state.groupName,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getOrder: (id) => dispatch(setSingleOrder(id)),
    editOrder: (orderId, order) => dispatch(editOrder(orderId, order, history)),
    deleteOrder: (order) => dispatch(removeOrder(order)),
    editItem: (itemId, item) => dispatch(editItem(itemId, item)),
    deleteItem: (itemId) => dispatch(removeItem(itemId)),
    newItem: (item, orderId) => dispatch(addItem(item, orderId)),
    getFaveGroups: (id) => dispatch(setFaveGroups(id)),
    loadGroups: () => dispatch(setGroups()),
    getTracking: (trackingNumber) => dispatch(setTracking(trackingNumber)),
    getName: (items) => dispatch(findAllGroupNames(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
