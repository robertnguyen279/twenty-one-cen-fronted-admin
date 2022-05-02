import React from 'react';
import compressImage from 'services/compress.service';
import { message, Image } from 'antd';
import { IUploadSingleImage } from 'types';
import axios from 'services/axios.service';

const UploadImage = ({
  accept,
  error,
  handleUploadSuccess,
  initialPicture,
}: IUploadSingleImage): React.ReactElement => {
  const [imageUrl, setImageUrl] = React.useState(initialPicture || '');

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
            setImageUrl(response.data.url);
            message.success('Upload hình thành công');
          })
          .catch(() => {
            message.error('Upload hình thất bại');
          });
      }
    });
  };

  React.useEffect(() => {
    handleUploadSuccess(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <input type="file" accept={accept} onChange={hanldeUploadImage} className="ml-2" />
      <p className="relative text-xs text-red-600">{error}</p>
      <div className="img_wrapper mt-3 flex flex-wrap justify-start">
        {imageUrl && <Image src={imageUrl} alt="upload-image" />}
      </div>
    </div>
  );
};

export default UploadImage;
