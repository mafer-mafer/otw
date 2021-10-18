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
          { yellow: purpose === "NewOrder" },
          { purple: purpose === "NewOrderHome" },
          {
            "blue edit-order-button": purpose === "EditOrder",
          },
          {
            "blue single-order-item-button-edit": purpose === "EditItem",
          },
          {
            "yellow single-order-item-button-new": purpose === "NewItem",
          },
          { purple: purpose === "EditGroups" },
          { "purple home-button-auth": purpose === "LogIn" },
          { "purple home-button-auth": purpose === "SignUp" },
          { purple: purpose === "Community" }
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
