import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/Form';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/index.reducer';
import { createUserByAdmin, getUsers } from 'actions/user.action';
import { IEditUser } from 'types';
import { message } from 'antd';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';

const { Option } = Select;

const CreateUser = ({ handleChangeView }: IEditUser): React.ReactElement => {
  const dispatch = useDispatch();
  const createUserByAdminError = useSelector((state: RootState) => state.userReducer.createUserByAdminError);
  const createUserByAdminSuccess = useSelector((state: RootState) => state.userReducer.createUserByAdminSuccess);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: 'superviser',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Bạn phải nhập mục này'),
      firstName: Yup.string().required('Bạn phải nhập mục này'),
      lastName: Yup.string().required('Bạn phải nhập mục này'),
      password: Yup.string().min(6, 'Mật khẩu quá ngắn').max(20, 'Mật khẩu quá dài').required('Bạn phải nhập mục này'),
      confirmPassword: Yup.string()
        .required('Bạn phải nhập mục này')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
    onSubmit: ({ email, firstName, lastName, role, password }) => {
      dispatch(createUserByAdmin({ email, firstName, lastName, role, password }));
    },
  });

  const handleSelectChange = (value: string) => {
    formik.values.role = value;
  };

  React.useEffect(() => {
    if (createUserByAdminError) {
      if (createUserByAdminError.includes('email')) {
        message.error('Email bị trùng lặp');
      } else if (createUserByAdminError.includes('lastName')) {
        message.error('Họ không phù hợp');
      } else if (createUserByAdminError.includes('firstName')) {
        message.error('Tên không phù hợp');
      } else if (createUserByAdminError.includes('password')) {
        message.error('Mật khẩu phải gồm cả số và chữ');
      } else {
        message.error(createUserByAdminError);
      }
    }
  }, [createUserByAdminError]);

  React.useEffect(() => {
    if (createUserByAdminSuccess) {
      message.success('Thêm người dùng thành công');
      dispatch(getUsers());
      handleChangeView();
    }
  }, [createUserByAdminSuccess]);

  return (
    <div className="edit_user animate__animated animate__fadeInRight">
      <div className="title text-2xl font-bold md:pt-20 pb-10 text-center">Thêm người dùng</div>
      <form onSubmit={formik.handleSubmit} className="form md:pr-10">
        <div className="form_title pt-2 text-sm pb-2 text-left font-normal pl-2">Email</div>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email && formik.touched.email ? formik.errors.email : false}
        />
        <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Tên</div>
        <Input
          type="text"
          name="firstName"
          placeholder="Tên"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          error={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : false}
        />
        <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Họ</div>
        <Input
          type="text"
          name="lastName"
          placeholder="Họ"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : false}
        />
        <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Vai trò</div>
        <Select defaultValue={formik.values.role} style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value="user">Nguời dùng</Option>
          <Option value="superviser">Giám sát</Option>
          <Option value="admin">Admin</Option>
        </Select>
        <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Mật khẩu</div>
        <Input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password && formik.touched.password ? formik.errors.password : false}
        />
        <div className="form_title pt-5 text-sm pb-2 text-left font-normal pl-2">Xác nhận mật khẩu</div>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : false
          }
        />
        <div className="submit_buttons pt-5 flex justify-center items-center">
          <CancelButton onClick={handleChangeView} className="mx-2">
            Hủy
          </CancelButton>
          <Button type="submit" className="mx-2">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
