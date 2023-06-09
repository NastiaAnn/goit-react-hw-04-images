import { useEffect } from 'react';
import { Overlay, StyledModal } from './styled';
import PropTypes from 'prop-types';

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, [onClose]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', e => {
        if (e.code === 'Escape') {
          onClose();
        }
      });
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
