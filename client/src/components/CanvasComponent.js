import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

export const CanvasComponent = () => {
  const canvasEl = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasEl.current);
    setCanvas(newCanvas);
    return () => {
      newCanvas.dispose();
    };
  }, []);

  const addImageToCanvas = (imageUrl) => {
    fabric.Image.fromURL(imageUrl, img => {
      img.scaleToWidth(canvas.width);
      canvas.clear();
      canvas.add(img);
      canvas.sendToBack(img);
    }, { crossOrigin: 'anonymous' });
  };

  const addText = () => {
    const text = new fabric.Textbox('Your Text', {
      left: 100,
      top: 100,
      fontSize: 20,
      editable: true
    });
    canvas.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          fill: 'rgba(0,0,255,0.5)',
          left: 150,
          top: 150
        });
        break;
      case 'rectangle':
        shape = new fabric.Rect({
          width: 100,
          height: 50,
          fill: 'rgba(0,255,0,0.5)',
          left: 200,
          top: 200
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: 'rgba(255,0,0,0.5)',
          left: 250,
          top: 250
        });
        break;
      default:
        break;
    }
    if (shape) canvas.add(shape);
  };

  const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'modified-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="canvas-editor">
      <canvas ref={canvasEl} width="800" height="600"></canvas>
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={downloadCanvas}>Download</button>
      </div>
    </div>
  );
};


