import React from "react";
import { connect } from "react-redux";
import { setOrders } from "../store/orders";
import { Link } from "react-router-dom";
import history from "../history";
import FormContainer from "./FormContainer";
import { addNewOrder } from "../store/singleOrder";

export class Orders extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newFormButton = this.newFormButton.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.id) {
      this.props.getOrders(this.props.auth.id);
    }
  }

  newFormButton(e) {
    e.preventDefault(e);
    console.log("event is", e);
  }

  handleSubmit(state, userId) {
    this.props.createOrder(state, userId);
  }

  render() {
    return (
      <div className="after-scallop">
        <div className="orders-inner-nav">
          <h3 className="orders-title">❥Your Incoming Orders:</h3>
          <FormContainer
            userId={this.props.auth.id}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div>
          {this.props.orders.length ? (
            <div>
              {this.props.orders.map((order) => {
                return (
                  <div key={order.id}>
                    <Link to={`/orders/${order.id}`}>
                      <table className="orders-table">
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
                          <tr></tr>
                        </tbody>
                      </table>
                      <br></br>
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
