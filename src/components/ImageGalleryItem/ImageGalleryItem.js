import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryListItems, PrewiewPhoto } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export const ImageGalleryItems = ({ prewiewImg, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalToggle = () => {
    setIsModalOpen(prevState => !prevState);
  };
  return (
    <>
      <GalleryListItems onClick={modalToggle}>
        <PrewiewPhoto src={prewiewImg} alt={tags} />
      </GalleryListItems>
      {isModalOpen && (
        <Modal photo={largeImageURL} tags={tags} onCloseModal={modalToggle} />
      )}
    </>
  );
};

ImageGalleryItems.propTypes = {
  prewiewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
