// Convert File to Image Element
const fileToImage = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });
};

// Convert Image to Canvas
const imageToCanvas = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas;
};

// Embed Message into Image (LSB Steganography)
export const embedMessage = async (imageFile, message) => {
  const img = await fileToImage(imageFile);
  const canvas = imageToCanvas(img);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Convert message to binary
  const binaryMessage = message.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');

  let messageIndex = 0;

  // Embed message in LSB of each pixel's R, G, B channels
  for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
    for (let j = 0; j < 3; j++) { // R, G, B (skip Alpha)
      if (messageIndex < binaryMessage.length) {
        // Clear LSB and set to message bit
        data[i + j] = (data[i + j] & 0xFE) | parseInt(binaryMessage[messageIndex], 10);
        messageIndex++;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  
  // Return as Blob (PNG)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/png');
  });
};

// Extract Message from Image
export const extractMessage = async (imageFile) => {
  const img = await fileToImage(imageFile);
  const canvas = imageToCanvas(img);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let binaryMessage = '';
  const terminator = '00000000'; // NULL terminator in binary

  for (let i = 0; i < data.length; i += 4) {
    for (let j = 0; j < 3; j++) { // R, G, B channels
      binaryMessage += (data[i + j] & 1).toString(); // Get LSB

      // Stop if terminator is found
      if (binaryMessage.endsWith(terminator)) {
        binaryMessage = binaryMessage.slice(0, -terminator.length); // Remove terminator
        i = data.length; // Exit outer loop
        break;
      }
    }
  }

  // Convert binary to string (skip incomplete bytes)
  let message = '';
  for (let i = 0; i < binaryMessage.length; i += 8) {
    const byte = binaryMessage.slice(i, i + 8);
    if (byte.length !== 8) break; // Skip partial bytes
    message += String.fromCharCode(parseInt(byte, 2));
  }

  return message; // No .trim() to preserve intentional spaces
};

// Visualize LSB (Black & White)
export const visualizeLSB = async (imageFile) => {
  const img = await fileToImage(imageFile);
  const canvas = imageToCanvas(img);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Set all pixels to black or white based on LSB
  for (let i = 0; i < data.length; i += 4) {
    const lsb = data[i] & 1; // Check Red channel's LSB
    const value = lsb * 255;
    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
  }

  ctx.putImageData(imageData, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/png');
  });
};