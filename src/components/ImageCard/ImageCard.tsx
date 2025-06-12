import { ImageData } from '../../types';
import css from './ImageCard.module.css';

interface Props {
  imageData: ImageData;
  onImageClick: (imageId: string) => void;
}

export default function ImageCard({ imageData, onImageClick }: Props) {
  const handleClick = () => {
    onImageClick(imageData.id);
  };

  return (
    <div className={css.container} onClick={handleClick}>
      <img src={imageData.webformatURL} alt={imageData.altText} />
    </div>
  );
}
