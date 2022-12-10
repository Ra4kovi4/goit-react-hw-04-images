import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryListItems, PrewiewPhoto } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export class ImageGalleryItems extends Component {
  state = {
    isModalOpen: false,
  };
  modalToggle = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  render() {
    const { isModalOpen } = this.state;
    const { prewiewImg, tags, largeImageURL } = this.props;
    return (
      <>
        <GalleryListItems onClick={this.modalToggle}>
          <PrewiewPhoto src={prewiewImg} alt={tags} />
        </GalleryListItems>
        {isModalOpen && (
          <Modal
            photo={largeImageURL}
            tags={tags}
            onCloseModal={this.modalToggle}
          />
        )}
      </>
    );
  }
}
ImageGalleryItems.propTypes = {
  prewiewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
