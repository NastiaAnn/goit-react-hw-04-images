import { useState } from 'react';
import { FormInput, SearchForm, FormButton, FormWrap } from './styled';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function SearchBar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      Notify.warning('Empty line. Please enter something in the search field');
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <FormWrap>
      <header className="searchbar">
        <SearchForm onSubmit={handleSubmit}>
          <FormButton type="submit">
            <GoSearch size={'15px'} />
          </FormButton>

          <FormInput
            placeholder="Search images and photos"
            value={imageName}
            onChange={handleNameChange}
          />
        </SearchForm>
      </header>
    </FormWrap>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
