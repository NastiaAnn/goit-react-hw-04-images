import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Circles } from 'react-loader-spinner';
import { LoadMoreBtn } from 'components/LoadMoreBtn';
import { fetchImages } from 'services/Api';
import { Modal } from 'components/Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [imageName, setImageName] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoadedBtn, setLoadedBtn] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setIsLoader(true);
    setLoadedBtn(false);
    fetchImages(imageName, page)
      .then(images => {
        setTotalHits(images.data.totalHits);
        if (images.data.totalHits === 0 || imageName.trim() === '') {
          setImagesArray([]);
          setIsLoader(true);
          setLoadedBtn(false);
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setImagesArray(prevImages => [...prevImages, ...images.data.hits]);
        setLoadedBtn(true);
        setPage(page);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImagesArray([]);
    setPage(1);
  };

  const toggleModal = image => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(image);
  };

  const handleLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  console.log('button load more');
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleFormSubmit} />

      <ImageGallery imagesArray={imagesArray} handleModalClick={toggleModal} />

      {isLoader && (
        <Circles
          height="100"
          width="100"
          color="#004F98"
          ariaLabel="circles-loading"
          wrapperStyle={{
            position: 'fixed',
            display: 'flex',
            top: 0,
            bottom: 100,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
          wrapperClass=""
          visible={true}
        />
      )}

      {totalHits !== imagesArray.length && isLoadedBtn && (
        <LoadMoreBtn handleLoadMoreBtnClick={handleLoadMoreBtnClick} />
      )}

      {showModal && selectedImage && (
        <Modal onClose={toggleModal}>
          <img
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
          />
        </Modal>
      )}
    </div>
  );
}
