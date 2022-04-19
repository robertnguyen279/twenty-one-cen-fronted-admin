import imageCompression from 'browser-image-compression';

const compressImage = (file: File, callback: (err, file?: File) => void): void => {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  imageCompression(file, options)
    .then((compressFile) => {
      callback(null, compressFile);
    })
    .catch((err) => callback(err));
};

export default compressImage;
