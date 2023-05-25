import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { Image, ImageItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ modalImage, image, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageItem>
        <Image src={image} alt={tags} onClick={toggleModal} />
      </ImageItem>
      {showModal && (
        <Modal onClose={toggleModal} src={modalImage} alt={tags}></Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  modalImage: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
