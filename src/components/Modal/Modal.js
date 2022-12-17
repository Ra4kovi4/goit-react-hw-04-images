import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ photo, tags, onCloseModal }) => {
  const handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
  useEffect(() => {
    const handlerCloseKeydown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handlerCloseKeydown);
    return () => window.removeEventListener('keydown', handlerCloseKeydown);
  }, [onCloseModal]);

  return createPortal(
    <Backdrop onClick={handleBackdropClose}>
      <ModalWindow>
        <img src={photo} alt={tags} width="800" height="600" />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
