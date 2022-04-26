import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/Form';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { removeNull } from 'services/common.service';
import { message } from 'antd';
import { ICreateCarousel } from 'types';
import { UploadSingleImage } from 'components/Form';
import { getCarousels } from 'actions/carousel.action';
import axios from 'services/axios.service';

const CreateProduct = ({ handleChangeView }: ICreateCarousel): React.ReactElement => {
  const dispatch = useDispatch();
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
        .post('/carousel', cleanSubmitObject)
        .then((response) => {
          if (response.data.statusCode === 201) {
            message.success('Tạo hình ảnh thành công');
            dispatch(getCarousels());
            handleChangeView();
          }
        })
        .catch(() => {
          message.error('Tạp blog thất bại');
        });
    },
  });

  const hanldeUploadPicutureSuccess = (url: string) => {
    formik.values.picture = url;
  };

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Tạo hình ảnh</div>
      <form onSubmit={formik.handleSubmit} className="md:p-10 relative form">
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Tiêu đề</div>
        <Input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description && formik.touched.description ? formik.errors.description : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Ảnh</div>
        <div className="w-60 relative">
          <UploadSingleImage
            accept="image/png, image/jpeg, image/jpg"
            error={formik.errors.picture && formik.touched.picture ? formik.errors.picture : false}
            handleUploadSuccess={hanldeUploadPicutureSuccess}
          />
        </div>

        <div className="submit_buttons pt-5 flex justify-center items-center">
          <CancelButton className="mx-2" onClick={handleChangeView}>
            Hủy
          </CancelButton>
          <Button type="submit" className="mx-2">
            Tạo hình ảnh
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
