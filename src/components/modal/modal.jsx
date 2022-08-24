import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modal from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

const modalRoot = document.getElementById('modal');

function Modal (props) {
  const { children, onClose } = props;

  const closeByEsc = (e) => {
    if(e.key === 'Escape') {
      onClose();
    };
  };

  React.useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => {
    document.removeEventListener('keydown', closeByEsc);
    }
  },[])

  return ReactDOM.createPortal(
    (
      <ModalOverlay close={onClose}>
        <div className={modal.popup} >
          <button type="button" className={modal.toggle} onClick={onClose}></button>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default Modal;
