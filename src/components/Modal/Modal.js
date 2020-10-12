import React from "react";
import ReactDom from "react-dom";

// import "./modal.css";
import "../../style/modal.css";

const Modal = ({ children, modalState, onClose }) => {
  if (!modalState) return null;

  return ReactDom.createPortal(
    <div className={`modal modalShowing-${modalState}`}>
      <div className="modalInner">
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
