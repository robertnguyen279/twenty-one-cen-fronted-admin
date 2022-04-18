import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';
import { changeSpaceName } from './common.service';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucket = new AWS.S3({
  params: { Bucket: 'twenty-one-static-images' },
  region: 'ap-southeast-1',
});

export const uploadToS3 = (file: File, callback: (err, url?: string) => void): void => {
  const fortmattedName = changeSpaceName(file.name);
  const key = `${fortmattedName.split('.')[0]}-${Date.now()}.png`;
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  imageCompression(file, options)
    .then((compressFile) => {
      const params = {
        Key: key,
        ContentType: compressFile.type,
        Body: compressFile,
      };

      bucket.putObject(params as any, function (err) {
        if (err) {
          callback(err);
        }

        callback(null, `https://twenty-one-static-images.s3.ap-southeast-1.amazonaws.com/${key}`);
      });
    })
    .catch((err) => callback(err));
};
