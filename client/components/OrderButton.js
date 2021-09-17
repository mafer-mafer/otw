import React from "react";

export class OrderButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="orders-button-new"
        onClick={this.props.showModal}
        ref={this.props.buttonRef}
      >
        {this.props.buttonText}
      </button>
    );
  }
}
export default OrderButton;
