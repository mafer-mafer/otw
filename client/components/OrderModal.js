import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import NewOrderForm from "./NewOrderForm";
import EditOrderForm from "./EditOrderForm";
import EditItemForm from "./EditItemForm";
import NewItemForm from "./NewItemForm";
import EditGroupsForm from "./EditGroupsForm";
import { LogIn, SignUp } from "./AuthForm";

export const NewOrderModal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  handleSubmit,
  userId,
  purpose,
  order,
  item,
  allGroups,
  faveGroups,
  removeFaveGroup,
  addFaveGroup,
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            {purpose === "NewOrder" || purpose === "NewOrderHome" ? (
              <NewOrderForm handleSubmit={handleSubmit} userId={userId} />
            ) : purpose === "EditOrder" ? (
              <EditOrderForm
                handleSubmit={handleSubmit}
                userId={userId}
                order={order}
                closeModal={closeModal}
              />
            ) : purpose === "EditItem" ? (
              <EditItemForm
                handleSubmit={handleSubmit}
                item={item}
                closeModal={closeModal}
                allGroups={allGroups}
                faveGroups={faveGroups}
              />
            ) : purpose === "NewItem" ? (
              <NewItemForm
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                allGroups={allGroups}
                faveGroups={faveGroups}
              />
            ) : purpose === "EditGroups" ? (
              <EditGroupsForm
                closeModal={closeModal}
                allGroups={allGroups}
                faveGroups={faveGroups}
                removeFaveGroup={removeFaveGroup}
                userId={userId}
                addFaveGroup={addFaveGroup}
              />
            ) : purpose === "LogIn" ? (
              <LogIn purpose={purpose} />
            ) : purpose === "SignUp" ? (
              <SignUp purpose={purpose} />
            ) : null}
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};
export default NewOrderModal;
