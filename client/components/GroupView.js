import React from "react";
import { connect } from "react-redux";
import { setSingleGroupItems } from "../store/singleGroup";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import { addNewOrder } from "../store/singleOrder";

export class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
    this.toggleView = this.toggleView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activeFilter = this.activeFilter.bind(this);
  }

  componentDidMount() {
    try {
      if (this.props.auth.id) {
        this.props.getGroup(
          this.props.match.params.groupId,
          this.props.auth.id
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  toggleView() {
    this.setState({ active: !this.state.active });
  }

  handleSubmit(state) {
    this.props.createOrder(state, this.props.auth.id);
  }

  activeFilter(theOrders) {
    const orderList = this.state.active
      ? theOrders.filter((order) => {
          return order.status !== "Arrived";
        })
      : theOrders.filter((order) => {
          console.log("false");
          return order.status === "Arrived";
        });

    orderList.sort((a, b) => a - b);
    return orderList;
  }

  render() {
    const theOrders = this.props.theOrders;
    return (
      <div>
        {theOrders.length ? (
          <div>
            <div className="orders-inner-nav">
              <div id="orders-nav-side">
                <button
                  className="buttons"
                  id="group-view-type-button"
                  onClick={this.toggleView}
                >
                  {this.state.active
                    ? "View Past Orders"
                    : "View Active Orders"}
                </button>
              </div>
              <h3 id="group-title">
                Incoming{" "}
                {theOrders.length
                  ? theOrders[0].items[0].groupName + " "
                  : null}
                Items
              </h3>
              <div id="orders-nav-side">
                <FormContainer
                  userId={this.props.auth.id}
                  handleSubmit={this.handleSubmit}
                  purpose={"NewOrder"}
                  buttonText="+New Order"
                />
              </div>
            </div>
            {this.activeFilter(theOrders).map((order) => {
              return order.items.map((item) => {
                return (
                  <div key={item.id} className="group-items-container">
                    <Link to={`/orders/${item.orderId}`}>
                      <table className="tables" id="group-item-table">
                        <tbody>
                          <tr>
                            <th>Item Description</th>
                            <th>Type</th>
                            <th>Pre-Order</th>
                            <th>Damage</th>
                          </tr>
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.preOrder ? "Yes" : "No"}</td>
                            <td>{item.damage}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Link>
                  </div>
                );
              });
            })}
          </div>
        ) : (
          <div>
            <br></br>
            <br></br>
            <h3>Seems like you have no items coming in for this group.</h3>
            <FormContainer
              userId={this.props.auth.id}
              handleSubmit={this.handleSubmit}
              purpose={"NewOrder"}
              buttonText="Add a New Order for this Group?"
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    theOrders: state.singleGroupItems,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getGroup: (groupId, userId) =>
      dispatch(setSingleGroupItems(groupId, userId)),
    createOrder: (newOrderData, user) =>
      dispatch(addNewOrder(newOrderData, user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
