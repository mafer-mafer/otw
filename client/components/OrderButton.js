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
          { "orders-button-new": this.props.fromNewOrder },
          { "single-order-button-edit": this.props.fromEditOrder }
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
