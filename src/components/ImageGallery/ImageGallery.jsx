import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imagesArray, handleModalClick }) => {
  return (
    <StyledGallery>
      {imagesArray &&
        imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <Image
              key={id}
              smallImgUrl={webformatURL}
              bigImgUrl={largeImageURL}
              imgDescr={tags}
              handleImgClick={handleModalClick}
            />
          );
        })}
    </StyledGallery>
  );
};

ImageGallery.propTypes = {
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
