import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerCloseKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerCloseKeydown);
  }
  handlerCloseKeydown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали Escape');

      this.props.onCloseModal();
    }
  };
  handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      console.log('нажали backdrop');

      this.props.onCloseModal();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClose}>
        <ModalWindow>
          <img
            src={this.props.photo}
            alt={this.props.tags}
            width="800"
            height="600"
          />
        </ModalWindow>
      </Backdrop>,
      modalRoot
    );
  }
}
