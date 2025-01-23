import React from 'react';
import { ImageSearch } from './components/ImageSearch';

import { CanvasComponent } from './components/CanvasComponent';

const App = () => {
  const handleImageSelect = (imageUrl) => {
    const canvasEvent = new CustomEvent('addImage', { detail: { imageUrl } });
    window.dispatchEvent(canvasEvent);
  };

  return (
    <div className="app-container">
      <h1>Image Caption Editor</h1>
      <ImageSearch onImageSelect={handleImageSelect} />
      <CanvasComponent/>
    </div>
  );
};

export default App;
