import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';

import { fetchImages, parseImagesData, scrollPage } from './utils';

import { useEffect, useState } from 'react';

import type { ImageData } from './types';

function App() {
  const [imagesCollection, setImagesCollection] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [modalImageId, setModalImageId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setImagesCollection([]);
    setCurrentPage(1);
  };

  const incrementPage = (): void => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function fetchData(): Promise<void> {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchImages(searchQuery, currentPage);
        setImagesCollection(prevCollection => [
          ...prevCollection,
          ...parseImagesData(data.imagesData),
        ]);
        setTotalPages(data.totalPages);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchQuery, currentPage]);

  const isLastPage = currentPage === totalPages - 1;

  const handleImageClick = (imageId: string): void => {
    setModalImageId(imageId); // Set the clicked image data
    setIsImageModalOpen(true); // Open the modal
  };

  const handleCloseModal = (): void => {
    setIsImageModalOpen(false); // Close the modal
    setModalImageId(null);
  };

  useEffect(() => {
    scrollPage();
  }, [imagesCollection]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {imagesCollection.length > 0 && (
        <ImageGallery
          images={imagesCollection}
          onImageClick={handleImageClick}
        />
      )}
      {isLoading && <Loader loading={isLoading} />}
      {isError && <ErrorMessage />}
      {imagesCollection.length > 0 && !isLastPage && !isLoading && (
        <LoadMoreButton onLoadMore={incrementPage} />
      )}
      {isImageModalOpen && (
        <ImageModal
          imageData={imagesCollection.find(
            (image: ImageData) => image.id === modalImageId
          )}
          isImageModalOpen={isImageModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
