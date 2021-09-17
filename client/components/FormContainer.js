import React, { Component } from "react";
import NewOrderModal from "./NewOrderModal";
import NewOrderButton from "./NewOrderButton";

export class FormContainer extends Component {
  constructor() {
    super();
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
    this.NewOrderButton.focus();
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
          <NewOrderButton
            showModal={this.showModal}
            buttonRef={(n) => (this.NewOrderButton = n)}
          />
          {this.state.isShown ? (
            <NewOrderModal
              onSubmit={this.props.onSubmit}
              modalRef={(n) => (this.modal = n)}
              buttonRef={(n) => (this.closeButton = n)}
              closeModal={this.closeModal}
              onKeyDown={this.onKeyDown}
              onClickOutside={this.onClickOutside}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
export default FormContainer;
