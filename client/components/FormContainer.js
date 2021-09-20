import React, { Component } from "react";
import OrderModal from "./OrderModal";
import OrderButton from "./OrderButton";

export class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleScrollLock = this.toggleScrollLock.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  showModal() {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  }

  closeModal() {
    this.setState({ isShown: false });
    this.OrderButton.focus();
    this.toggleScrollLock();
  }

  toggleScrollLock() {
    document.querySelector("html").classList.toggle("scroll-lock");
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  onClickOutside(event) {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <OrderButton
            showModal={this.showModal}
            buttonRef={(n) => (this.OrderButton = n)}
            buttonText={this.props.buttonText}
            purpose={this.props.purpose}
          />
          {this.state.isShown ? (
            <OrderModal
              handleSubmit={this.props.handleSubmit}
              modalRef={(n) => (this.modal = n)}
              buttonRef={(n) => (this.closeButton = n)}
              closeModal={this.closeModal}
              onKeyDown={this.onKeyDown}
              onClickOutside={this.onClickOutside}
              userId={this.props.userId}
              purpose={this.props.purpose}
              order={this.props.order}
              item={this.props.item}
              groups={this.props.groups}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
export default FormContainer;
