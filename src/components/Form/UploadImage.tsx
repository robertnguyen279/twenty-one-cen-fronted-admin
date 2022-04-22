import React from 'react';
import CloseIcon from 'assets/icons/close-svgrepo-com.svg';
import compressImage from 'services/compress.service';
import { message } from 'antd';
import { IUploadImage } from 'types';
import axios from 'services/axios.service';

const UploadImage = ({ accept, error, handleUploadSuccess, initialPictures }: IUploadImage): React.ReactElement => {
  const [imageList, setImageList] = React.useState(initialPictures || []);

  const handleRemoveImage = (imgUrl: string): void => {
    setImageList((preState) => preState.filter((img) => img !== imgUrl));
  };

  const hanldeUploadImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];

    compressImage(file, (err, compressFile) => {
      if (err) {
        console.log({ ...err });
        message.error('Upload hình thất bại');
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append('file', compressFile);

        axios
          .post('/upload', bodyFormData)
          .then((response) => {
            setImageList((preState) => [...preState, response.data.url]);
            message.success('Upload hình thành công');
          })
          .catch(() => {
            message.error('Upload hình thất bại');
          });
      }
    });
  };

  React.useEffect(() => {
    handleUploadSuccess(imageList);
  }, [imageList]);

  return (
    <div>
      <input type="file" accept={accept} onChange={hanldeUploadImage} className="ml-2" />
      <p className="relative text-xs text-red-600">{error}</p>
      <div className="img_wrapper mt-3 flex flex-wrap justify-start">
        {imageList &&
          imageList.map((imgUrl, i) => (
            <div className="img_wrapper m-2 relative" key={i}>
              <img
                src={CloseIcon}
                alt="close-icon"
                className="absolute right-0 top-0 w-4 cursor-pointer"
                onClick={() => handleRemoveImage(imgUrl)}
              />
              <img src={imgUrl} alt="upload-image" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImage;
