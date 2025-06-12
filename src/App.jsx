import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';

import { fetchImages, parseImagesData, scrollPage } from './utils';

import { useEffect, useState } from 'react';

function App() {
  const [imagesCollection, setImagesCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageId, setModalImageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = query => {
    setSearchQuery(query);
    setImagesCollection([]);
    setCurrentPage(1);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function fetchData() {
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

  const handleImageClick = imageId => {
    setModalImageId(imageId); // Set the clicked image data
    setIsImageModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {imagesCollection.length > 0 && !isLastPage && !isLoading && (
        <LoadMoreButton onLoadMore={incrementPage} />
      )}
      {isImageModalOpen && (
        <ImageModal
          imageData={imagesCollection.find(image => image.id === modalImageId)}
          isImageModalOpen={isImageModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
