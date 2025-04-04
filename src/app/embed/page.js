'use client';
import { useState } from 'react';
import FileUpload from '../Components/FileUpload';
import { embedMessage } from '../Utils/steganography';

export default function Embed() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [outputImage, setOutputImage] = useState(null);

  const handleEmbed = async () => {
    if (!image || !message) return alert('Please upload an image and enter a message!');
    try {
      const embeddedImageUrl = await embedMessage(image, message);
      setOutputImage(embeddedImageUrl);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Embed Message</h2>
      <FileUpload onFileUpload={setImage} label="Upload Image" />
      <textarea
        placeholder="Enter your secret message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleEmbed}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Embed Message
      </button>
      {outputImage && (
        <div className="mt-4">
          <img src={outputImage} alt="Embedded Image" className="max-w-full mb-2" />
          <a
            href={outputImage}
            download="embedded_image.png"
            className="text-blue-500 underline"
          >
            Download Embedded Image
          </a>
        </div>
      )}
    </div>
  );
}