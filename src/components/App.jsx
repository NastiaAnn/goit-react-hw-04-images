import { useState } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

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

      <ImageGallery imageName={imageName} />
    </div>
  );
}
