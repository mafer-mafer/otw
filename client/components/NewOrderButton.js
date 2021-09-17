import React from "react";

export class NewOrderButton extends React.Component {
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
        +New Order
      </button>
    );
  }
}
export default NewOrderButton;
