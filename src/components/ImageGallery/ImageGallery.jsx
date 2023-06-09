import { useState, useEffect } from 'react';
import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import { Circles } from 'react-loader-spinner';
import { LoadMoreBtn } from 'components/LoadMoreBtn';
import { fetchImages } from 'services/Api';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function ImageGallery({ imageName }) {
  const [imagesArray, setImagesArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoadedBtn, setLoadedBtn] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (imageName.trim() === '') {
      return;
    }

    setImagesArray([]);
    setIsLoader(true);
    setLoadedBtn(false);
    setPage(1);
    fetchImages(imageName, 1)
      .then(images => {
        setTotalHits(images.data.totalHits);
        handleAPIRequestChecking(images);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [imageName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setIsLoader(true);
    setLoadedBtn(false);
    fetchImages(imageName, page)
      .then(images => {
        if (totalHits - 12 <= imagesArray.length) {
          setImagesArray(prevImages => [...prevImages, ...images.data.hits]);
          setLoadedBtn(false);
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
  }, [page, totalHits, imageName, imagesArray.length]);

  const handleAPIRequestChecking = images => {
    if (images.data.totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (images.data.totalHits <= 12) {
      setImagesArray(images.data.hits);
      setLoadedBtn(false);
      setIsLoader(false);
      setPage(1);
    } else {
      setImagesArray(images.data.hits);
      setLoadedBtn(true);
      setIsLoader(false);
    }
  };

  const handleLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = image => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(image);
  };

  return (
    <div>
      <StyledGallery>
        {imagesArray &&
          imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <Image
                key={id}
                smallImgUrl={webformatURL}
                bigImgUrl={largeImageURL}
                imgDescr={tags}
                handleImgClick={toggleModal}
              />
            );
          })}
      </StyledGallery>

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

      {isLoadedBtn && (
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

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
