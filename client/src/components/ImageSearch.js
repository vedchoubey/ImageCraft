import React, { useState } from 'react';

const API_KEY = '48402676-f8d473efbf0736d87ac8f7f79'; // Replace with your API key for Pixabay.
const API_URL = 'https://pixabay.com/api/';

export const ImageSearch = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchImages = () => {
    if (!query) {
      alert('Please enter a search term.');
      return;
    }

    fetch(`${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch images.');
        }
        return response.json();
      })
      .then(data => {
        setResults(data.hits);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while fetching images.');
      });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
      />
      <button onClick={searchImages}>Search</button>

      <div className="results-container">
        {results.map((image) => (
          <img
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            onClick={() => onImageSelect(image.largeImageURL)}
          />
        ))}
      </div>
    </div>
  );
};


