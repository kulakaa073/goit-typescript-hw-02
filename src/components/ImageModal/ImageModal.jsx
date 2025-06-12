import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { scaleImageToRatio } from '../../utils';

export default function ImageModal({ imageData, isImageModalOpen, onClose }) {
  const customStyle = {
    content: { ...scaleImageToRatio(imageData) },
  };
  return (
    <Modal
      isOpen={isImageModalOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.content}
      style={customStyle}
    >
      <div className={css.container}>
        <img src={imageData.largeImageURL} alt={imageData.altText} />
        <div className={css.imageInfo}>
          <h2>Author: {imageData.author}</h2>
          <h3>{imageData.description}</h3>
        </div>
        <button type="button" onClick={onClose} className={css.closeButton}>
          X
        </button>
      </div>
    </Modal>

    // Reference modal component
    /*     <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageData.largeImageURL} alt={imageData.altText} />
        <div className="image-info">
          <h2>Author: {imageData.author}</h2>
          <p>{imageData.description}</p>
        </div>
        <button type="button" onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div> */
  );
}
