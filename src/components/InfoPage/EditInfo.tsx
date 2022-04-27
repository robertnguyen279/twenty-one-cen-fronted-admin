import React from 'react';
import { IEditInfo } from 'types/_components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input } from 'components/Form';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { convertInternationalPhone, convertVietnamesePhone } from 'services/common.service';
import axios from 'services/axios.service';
import { message } from 'antd';

const EditInfo = ({ handleChangeView, info }: IEditInfo): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      phone: convertInternationalPhone(info.phone.toString()),
      email: info.email,
      facebook: info.facebook,
      zalo: convertInternationalPhone(info.zalo.toString()),
    },
    validationSchema: Yup.object().shape({
      phone: Yup.number().required('Bạn phải nhập mục này'),
      email: Yup.string().email('Email không hợp lệ').required('Bạn phải nhập mục này'),
      facebook: Yup.string().required('Bạn phải nhập mục này'),
      zalo: Yup.number().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cloneObject = { ...submitObject };
      cloneObject.phone = convertVietnamesePhone(submitObject.phone);
      cloneObject.zalo = convertVietnamesePhone(submitObject.zalo);

      axios
        .patch('/site', cloneObject)
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Cập nhật thông tin thành công');
            handleChangeView();
          }
        })
        .catch(() => {
          message.error('Cập nhật thông tin thất bại');
        });
    },
  });
  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Sửa thông tin liên hệ</div>
      <form onSubmit={formik.handleSubmit} className="form md:pr-10">
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Số điện thoại</div>
        <Input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone && formik.touched.phone ? formik.errors.phone : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Email</div>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email && formik.touched.email ? formik.errors.email : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Facebook</div>
        <Input
          type="text"
          name="facebook"
          placeholder="Facebook"
          onChange={formik.handleChange}
          value={formik.values.facebook}
          error={formik.errors.facebook && formik.touched.facebook ? formik.errors.facebook : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Zalo</div>
        <Input
          type="text"
          name="zalo"
          placeholder="Zalo"
          onChange={formik.handleChange}
          value={formik.values.zalo}
          error={formik.errors.zalo && formik.touched.zalo ? formik.errors.zalo : false}
        />
        <div className="submit_buttons pt-5 flex justify-center items-center">
          <CancelButton className="mx-2" onClick={handleChangeView}>
            Hủy
          </CancelButton>
          <Button type="submit" className="mx-2">
            Sửa thông tin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
