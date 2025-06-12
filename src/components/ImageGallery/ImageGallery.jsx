import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.container}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard imageData={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
