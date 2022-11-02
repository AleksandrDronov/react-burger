import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import modal from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById('modal') as HTMLElement;

const Modal: FC<{children: ReactNode; onClose: () => void}> = (props) => {

  const { children, onClose } = props;

  const closeByEsc = (e: KeyboardEvent) => {
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


export default Modal;
