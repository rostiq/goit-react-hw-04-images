import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ imageToEnlarge, handleCloseModal }) => {

useEffect(() => {
    window.addEventListener('keydown', handleEscapeModal);

    return () => {
      window.removeEventListener('keydown', handleEscapeModal);
    };

  })

  const handleEscapeModal = (event) => {
    if (event.keyCode === 27) {
      handleCloseModal();
    }
  }

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      handleCloseModal();
    }
  };
  
  return (
      <>
          <div className={styles.overlay} onClick={handleOverlayClick} >
              <div className={styles.modal} >
                  <img src={imageToEnlarge} alt=""/>
              </div>
          </div>
     </>
    );

}

Modal.propTypes = {
  imageToEnlarge: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default Modal;
