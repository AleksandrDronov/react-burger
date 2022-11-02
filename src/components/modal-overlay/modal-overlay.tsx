import React, { FC, ReactNode, SyntheticEvent } from "react";
import overlay from './modal-overlay.module.css'


const ModalOverlay: FC<{children: ReactNode; close: () => void}> = (props) => {

  const closeByOverlay = (evt: SyntheticEvent) => {
    evt.target === evt.currentTarget && props.close();
    };

  return (
    <div className={overlay.popup} onClick={closeByOverlay}>
      {props.children}
    </div>
  )
}


export default ModalOverlay;
