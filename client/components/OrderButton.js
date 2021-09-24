import React from "react";
import classNames from "classnames";

export class OrderButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { purpose, showModal, buttonRef, buttonText } = this.props;
    return (
      <button
        className={classNames(
          "buttons",
          { "orders-button-new": purpose === "NewOrder" },
          { "home-button-new": purpose === "NewOrderHome" },
          {
            "single-order-button-edit": purpose === "EditOrder",
          },
          {
            "single-order-item-button-edit": purpose === "EditItem",
          },
          {
            "single-order-item-button-new": purpose === "NewItem",
          },
          { "groups-button-edit": purpose === "EditGroups" },
          { "home-button-auth": purpose === "LogIn" },
          { "home-button-auth": purpose === "SignUp" },
          { "home-button-comm": purpose === "Community" }
        )}
        onClick={showModal}
        ref={buttonRef}
      >
        {buttonText}
      </button>
    );
  }
}
export default OrderButton;
