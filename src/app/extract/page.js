'use client';
import { useState } from 'react';
import FileUpload from '../Components/FileUpload';
import { extractMessage } from '../Utils/steganography';

export default function Extract() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleExtract = async () => {
    if (!image) return alert('Please upload an image!');
    try {
      const extractedMessage = await extractMessage(image);
      setMessage(extractedMessage);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 pt-32 max-w-4xl mx-auto"> {/* Added max-width and margin auto */}
      <h2 className="text-xl font-bold mb-4">Extract Message</h2>
      <FileUpload onFileUpload={setImage} label="Upload Embedded Image" />
      <button
        onClick={handleExtract}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Extract Message
      </button>
      {message && (
        <>
        <div className="mt-4 py-4"> {/* Added text control */}
          <p className="font-semibold">Extracted Message:</p>
          <div className='mt-4 bg-gray-100 rounded-md break-words overflow-auto max-h-96'>
          <pre className="mt-2 whitespace-pre-wrap font-sans">{message}</pre> {/* Changed to pre with wrapping */}
          </div>
          </div>
        </>
      )}
    </div>
  );
}