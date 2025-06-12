import { ImageData } from '../../types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface Props {
  images: ImageData[];
  onImageClick: (imageId: string) => void;
}

export default function ImageGallery({ images, onImageClick }: Props) {
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
