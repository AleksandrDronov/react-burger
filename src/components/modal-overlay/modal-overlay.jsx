import React from "react";
import PropTypes from 'prop-types';
import overlay from './modal-overlay.module.css'


function ModalOverlay (props) {

  const closeByOverlay = (evt) => {
    evt.target === evt.currentTarget && props.close();
    };

  return (
    <div className={overlay.popup} onClick={closeByOverlay}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func
}

export default ModalOverlay;
