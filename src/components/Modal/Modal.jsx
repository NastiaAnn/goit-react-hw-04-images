import { useEffect } from 'react';
import { Overlay, StyledModal } from './styled';
import PropTypes from 'prop-types';

export function Modal({ onClose, children }) {
  useEffect(() => {
    const handleModalClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleModalClose);
    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <StyledModal>{children}</StyledModal>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
