import { StyledBtn } from './styled';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ handleLoadMoreBtnClick }) => {
  return <StyledBtn onClick={handleLoadMoreBtnClick}>Load more</StyledBtn>;
};

LoadMoreBtn.prototype = {
  handleLoadMoreBtnClick: PropTypes.func.isRequired,
};
