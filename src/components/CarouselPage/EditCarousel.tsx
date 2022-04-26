import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/Form';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { removeNull } from 'services/common.service';
import { message, Skeleton } from 'antd';
import { IEditCarousel } from 'types';
import { UploadSingleImage } from 'components/Form';
import { getCarousels } from 'actions/carousel.action';
import axios from 'services/axios.service';

const EditBlog = ({ handleChangeView, carouselId }: IEditCarousel): React.ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);
  const formik = useFormik({
    initialValues: {
      description: '',
      picture: '',
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required('Bạn phải nhập mục này'),
      picture: Yup.string().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cleanSubmitObject = removeNull(submitObject);

      axios
        .patch(`/carousel/${carouselId}`, cleanSubmitObject)
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Sửa hình ảnh thành công');
            dispatch(getCarousels());
            handleChangeView();
          }
        })
        .catch(() => {
          message.error('Sửa hình ảnh thất bại');
        });
    },
  });

  const hanldeUploadPicutureSuccess = (url: string) => {
    formik.values.picture = url;
  };

  React.useEffect(() => {
    axios.get(`/carousel/${carouselId}`).then((response) => {
      if (response.data.statusCode === 200) {
        const carousel = response.data.carousel;
        formik.values.description = carousel.description;
        formik.values.picture = carousel.picture;
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Sửa hình ảnh</div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <form onSubmit={formik.handleSubmit} className="md:w-2/3 md:p-10 relative large_form">
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Tiêu đề</div>
          <Input
            type="text"
            name="description"
            value={formik.values.description}
            placeholder="Mô tả"
            onChange={formik.handleChange}
            error={formik.errors.description && formik.touched.description ? formik.errors.description : false}
          />
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Ảnh</div>
          <div className="w-60 relative">
            <UploadSingleImage
              accept="image/png, image/jpeg, image/jpg"
              error={formik.errors.picture && formik.touched.picture ? formik.errors.picture : false}
              initialPicture={formik.values.picture}
              handleUploadSuccess={hanldeUploadPicutureSuccess}
            />
          </div>

          <div className="submit_buttons pt-5 flex justify-center items-center">
            <CancelButton className="mx-2" onClick={handleChangeView}>
              Hủy
            </CancelButton>
            <Button type="submit" className="mx-2">
              Sửa hình ảnh
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBlog;
