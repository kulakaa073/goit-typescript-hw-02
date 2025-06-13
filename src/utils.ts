import axios, { AxiosHeaderValue } from 'axios';
import type { ImageData, ImagePositionProps } from './types';

axios.defaults.baseURL = 'https://api.unsplash.com/';

interface PartialBackendImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  user: {
    name?: string;
  };
  description?: string;
  width: number;
  height: number;
}

interface Response {
  imagesData: PartialBackendImage[];
  totalPages: number;
}

export const fetchImages = async (query = '', page = 1): Promise<Response> => {
  const options = {
    url: 'search/photos',
    params: {
      page: page,
      query: query,
      per_page: 12,
    },
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN as AxiosHeaderValue,
    },
  };
  const response = await axios.get<{
    results: PartialBackendImage[];
    total_pages: number;
  }>(options.url, {
    params: options.params,
    headers: options.headers,
  });

  return {
    imagesData: response.data.results,
    totalPages: response.data.total_pages,
  };
};

export function parseImagesData(data: PartialBackendImage[]): ImageData[] {
  return data.map(image => ({
    id: image.id,
    webformatURL: image.urls.small,
    largeImageURL: image.urls.regular,
    altText: image.alt_description || 'No text available',
    author: image.user.name || 'Unknown',
    description: image.description || 'No description available',
    width: image.width,
    height: image.height,
  }));
}

// Scales image to fit in the window, hopefully
// Takes image object to get width and height of it
// Returns style params to attach to style with position and new size
export function scaleImageToRatio(image: ImageData): ImagePositionProps {
  let widthRatio = 0.8;
  let heightRatio = 0.9;
  let windowWidth = window.innerWidth * widthRatio;
  let windowHeight = window.innerHeight * heightRatio;
  let imageWidth = image.width,
    imageHeight = image.height;

  if (imageWidth > windowWidth || imageHeight > windowHeight) {
    let ratio =
      imageWidth / imageHeight > windowWidth / windowHeight
        ? imageWidth / windowWidth
        : imageHeight / windowHeight;
    imageWidth /= ratio;
    imageHeight /= ratio;
  }

  return {
    top: (window.innerHeight - imageHeight) / 2 + 'px',
    left: (window.innerWidth - imageWidth) / 2 + 'px',
    width: imageWidth + 'px',
    height: imageHeight + 'px',
  };
}

export function scrollPage(): void {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
}
