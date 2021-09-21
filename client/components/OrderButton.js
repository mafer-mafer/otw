import React from "react";
import classNames from "classnames";

export class OrderButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className={classNames(
          "buttons",
          { "orders-button-new": this.props.purpose === "NewOrder" },
          { "home-button-new": this.props.purpose === "NewOrderHome" },
          { "single-order-button-edit": this.props.purpose === "EditOrder" },
          {
            "single-order-item-button-edit": this.props.purpose === "EditItem",
          },
          { "single-order-item-button-new": this.props.purpose === "NewItem" },
          { "groups-button-edit": this.props.purpose === "EditGroups" },
          { "home-button-orders": this.props.purpose === "LogIn" },
          { "home-button-orders": this.props.purpose === "SignUp" }
        )}
        onClick={this.props.showModal}
        ref={this.props.buttonRef}
      >
        {this.props.buttonText}
      </button>
    );
  }
}
export default OrderButton;
