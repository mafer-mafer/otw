import React from "react";
import { connect } from "react-redux";
import { setSingleOrder, editOrder } from "../store/singleOrder";
import { removeOrder } from "../store/orders";
import FormContainer from "./FormContainer";
import history from "../history";
import { removeItem, editItem, addItem } from "../store/items";

export class SingleOrder extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrder(this.props.match.params.orderId);
    }
  }

  handleSubmit(state) {
    this.props.newItem(state, this.props.order.id);
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

  render() {
    let order = this.props.order;
    return (
      <div className="single-order-main-container">
        <div className="single-order-left">
          <h3 id="single-order-title">Your Order</h3>
          {this.props.order ? (
            <div className="single-container">
              <table className="tables" id="single-order-table">
                <tbody>
                  <tr>
                    <th>Date Ordered</th>
                    <th>Seller</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td>{order.dateOrdered}</td>
                    <td>{order.seller}</td>
                    <td>{order.type}</td>
                    <td>{order.status}</td>
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
                  <tr>
                    <th colSpan="4">Notes</th>
                  </tr>
                  <tr>
                    {order.note ? (
                      <td colSpan="4">{order.note}</td>
                    ) : (
                      <td colSpan="4">&nbsp;</td>
                    )}
                  </tr>
                </tbody>
              </table>
              <div>
                <FormContainer
                  userId={this.props.auth.id}
                  handleSubmit={this.handleEdit}
                  purpose={"EditOrder"}
                  buttonText={"+Edit Order"}
                  order={this.props.order}
                />
                <button
                  className="buttons"
                  id="single-order-button-del"
                  onClick={() => this.handleDelete("Order")}
                >
                  -Delete Order
                </button>
              </div>
            </div>
          ) : (
            <h3>Something went wrong w this order :0!</h3>
          )}
        </div>
        {this.props.order ? (
          <div className="single-order-right">
            <h2 id="single-order-items-title">Items</h2>
            <FormContainer
              handleSubmit={this.handleSubmit}
              purpose={"NewItem"}
              buttonText={"+New Item"}
            />
            <div className="single-order-items">
              {this.props.order.items && this.props.order.items.length ? (
                order.items.map((item) => {
                  return (
                    <div key={item.id}>
                      <table className="tables" id="single-order-item">
                        <tbody>
                          <tr>
                            <th>Group</th>
                            <th colSpan="2">Item Description</th>
                          </tr>
                          <tr>
                            <td>{item.groupName}</td>
                            <td colSpan="2">{item.name}</td>
                          </tr>
                          <tr>
                            <th>Type</th>
                            <th>Pre-Order</th>
                            <th>Damage</th>
                          </tr>
                          <tr>
                            <td>{item.type}</td>
                            <td>{item.preOrder ? "Yes" : "No"}</td>
                            <td>{item.damage}</td>
                          </tr>
                        </tbody>
                      </table>
                      <FormContainer
                        userId={this.props.auth.id}
                        handleSubmit={this.handleEdit}
                        purpose={"EditItem"}
                        buttonText={"+Edit Item"}
                        order={this.props.order}
                        item={item}
                      />
                      <button
                        className="buttons"
                        id="single-order-item-del"
                        onClick={() => this.handleDelete("Item", item.id)}
                      >
                        -Delete Item
                      </button>
                    </div>
                  );
                })
              ) : (
                <h4>Seems like there's no items in this order :0</h4>
              )}
            </div>
          </div>
        ) : (
          <h3>oops!</h3>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
