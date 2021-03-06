import React from "react";
import { connect } from "react-redux";
import { setOrders } from "../store/orders";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import { addNewOrder } from "../store/singleOrder";

export class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      filterType: "orderDate",
      active: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortOrders = this.sortOrders.bind(this);
    this.sorter = this.sorter.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrders(this.props.auth.id);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(state) {
    this.props.createOrder(state, this.props.auth.id);
  }

  toggleView() {
    this.setState({ active: !this.state.active });
  }

  sortOrders(orders) {
    if (orders.length) {
      const orderList = this.state.active
        ? orders.filter((order) => {
            return order.status !== "Arrived";
          })
        : orders.filter((order) => {
            console.log("false");
            return order.status === "Arrived";
          });

      if (this.state.filterType === "orderType") {
        return this.sorter(orderList, "type", true);
      } else if (this.state.filterType === "orderStatus") {
        return this.sorter(orderList, "status", true);
      } else if (this.state.filterType === "orderDate") {
        return this.sorter(orderList, "dateOrdered", false);
      } else if (this.state.filterType === "seller") {
        return this.sorter(orderList, "seller", true);
      }
      return orderList;
    }
  }

  sorter(orders, val, ascending) {
    if (ascending) {
      orders.sort(function (a, b) {
        if (a[val] < b[val]) {
          return -1;
        }
        if (a[val] > b[val]) {
          return 1;
        }
        return 0;
      });
    } else {
      orders.sort(function (a, b) {
        if (a[val] > b[val]) {
          return -1;
        }
        if (a[val] < b[val]) {
          return 1;
        }
        return 0;
      });
    }
    return orders;
  }

  render() {
    return (
      <div className="orders-main-container">
        <div className="orders-inner-nav">
          <div id="orders-nav-side">
            <button className="buttons mint" onClick={this.toggleView}>
              {this.state.active ? "View Past Orders" : "View Active Orders"}
            </button>
          </div>
          <h3 className="title">Your Incoming Orders</h3>
          <div id="orders-nav-side">
            <FormContainer
              userId={this.props.auth.id}
              handleSubmit={this.handleSubmit}
              purpose={"NewOrder"}
              buttonText="+New Order"
              order={false}
            />
          </div>
        </div>
        <div className="orders-body">
          <div className="orders-filter">
            <label htmlFor="filterType">Filter By:</label>
            <select name="filterType" onChange={this.handleChange}>
              <option value="orderDate">Date Ordered</option>
              <option value="orderType">Order Type</option>
              {this.state.active ? (
                <option value="orderStatus">Order Status</option>
              ) : null}
              <option value="seller">Seller</option>
            </select>
          </div>
          {this.props.orders.length ? (
            <div className="orders-all">
              {this.sortOrders(this.props.orders).map((order, idx) => {
                return (
                  <div key={order.id} className="orders-single-container">
                    <div className="orders-hearts">
                      <div>
                        <br></br>
                        <span id="orders-heart-1">???</span>
                        <br></br>
                        <span id="orders-heart-2">???</span>
                      </div>
                    </div>
                    <Link to={`/orders/${order.id}`}>
                      <table className="tables" id="orders-table">
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
                          <tr></tr>
                        </tbody>
                      </table>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3>Seems like you have nothing on the way currently :0!</h3>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getOrders: (id) => dispatch(setOrders(id)),
    createOrder: (newOrderData, user) =>
      dispatch(addNewOrder(newOrderData, user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
