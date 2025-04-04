'use client';
import { useState } from 'react';
import FileUpload from '../Components/FileUpload';
import { visualizeLSB } from '../Utils/steganography';

export default function Visualize() {
  const [image, setImage] = useState(null);
  const [lsbImage, setLsbImage] = useState(null);

  const handleVisualize = async () => {
    if (!image) return alert('Please upload an image!');
    try {
      const lsbImageUrl = await visualizeLSB(image);
      setLsbImage(lsbImageUrl);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Visualize LSB</h2>
      <FileUpload onFileUpload={setImage} label="Upload Image" />
      <button
        onClick={handleVisualize}
        className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Visualize LSB
      </button>
      {lsbImage && (
        <div className="mt-4">
          <img src={lsbImage} alt="LSB Visualization" className="max-w-full" />
          <a
            href={lsbImage}
            download="lsb_visualization.png"
            className="text-purple-500 underline mt-2 inline-block"
          >
            Download LSB Image
          </a>
        </div>
      )}
    </div>
  );
}