export interface ImageData {
  id: string;
  webformatURL: string;
  largeImageURL: string;
  altText: string;
  author: string;
  description: string;
  width: number;
  height: number;
}

export interface ImagePositionProps {
  top: string;
  left: string;
  width: string;
  height: string;
}
