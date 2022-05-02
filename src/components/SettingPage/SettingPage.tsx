import React from 'react';
import { Skeleton, Modal, message } from 'antd';
import { convertInternationalPhone } from 'services/common.service';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import EditInfo from './ChangeSetting';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers/index.reducer';
import { Input } from 'components/Form';
import { getUser, logoutUser } from 'actions/user.action';
import * as Yup from 'yup';
import axios from 'services/axios.service';
import { useHistory } from 'react-router-dom';

const SettingPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [view, setView] = React.useState({ type: 'view', createdAt: new Date() });
  const user = useSelector((state: RootState) => state.userReducer.user);
  const handleChangeInfoClick = () => {
    setView({ type: 'create', createdAt: new Date() });
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required('Bạn phải nhập mục này'),
      newPassword: Yup.string()
        .min(6, 'Mật khẩu quá ngắn')
        .max(20, 'Mật khẩu quá dài')
        .required('Bạn phải nhập mục này'),
      confirmPassword: Yup.string()
        .required('Bạn phải nhập mục này')
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
    }),
    onSubmit: ({ oldPassword, newPassword }) => {
      axios
        .patch('/user/password', { oldPassword, newPassword })
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Đổi mật khẩu thành công');
            setView({ type: 'view', createdAt: new Date() });
            setIsModalVisible(false);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.data.name.includes('ValidationError')) {
            message.error('Mật khẩu phải bao gồm chữ và số');
          } else if (error.response.data.name.includes('WrongPassword')) {
            message.error('Mật khẩu cũ sai');
          } else {
            message.error('Đổi mật khẩu thất bại');
          }
        });
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    formik.submitForm();
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    axios
      .delete('/user/logout')
      .then((response) => {
        if (response.data.statusCode === 200) {
          localStorage.removeItem('21cenAuthTokens');
          dispatch(logoutUser());
          setTimeout(() => {
            message.success('Đăng xuất thành công');
            history.push('/');
          }, 300);
        }
      })
      .catch(() => {
        message.error('Đăng xuất thất bại');
      });
  };

  const renderView = () => {
    if (view.type === 'view') {
      return (
        <div className="animate__animated animate__fadeInRight">
          <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Thông tin cá nhân</div>
          <div className="box_wrapper">
            {!user ? (
              <Skeleton />
            ) : (
              <React.Fragment>
                <div className="item my-3">
                  <div className="title font-bold inline">Tên: </div>
                  <div className="item_content inline">{user.fullName}</div>
                </div>
                <div className="item my-3">
                  <div className="title font-bold inline">Email: </div>
                  <div className="item_content inline">{user.email}</div>
                </div>
                <div className="item my-3">
                  <div className="title font-bold inline">Số điện thoại: </div>
                  <div className="item_content inline">
                    {user.phone ? convertInternationalPhone(user.phone.toString()) : 'Chưa cài'}
                  </div>
                </div>
                <div className="item my-3">
                  <div className="title font-bold inline">Vai trò: </div>
                  <div className="item_content inline">{user.role === 'admin' ? 'Admin' : 'Giám sát'}</div>
                </div>
                <div className="item my-3">
                  <div className="title font-bold inline">Mật khẩu: </div>
                  <div className="item_content inline">******</div>
                  <div className="item_content inline text-blue pl-5 cursor-pointer" onClick={showModal}>
                    Đổi mật khẩu
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <Button
            className="mt-5 relative left-1/2"
            style={{ transform: 'translateX(-50%)' }}
            onClick={handleChangeInfoClick}
          >
            Sửa thông tin
          </Button>
          <br />
          <CancelButton
            className="mt-5 relative left-1/2"
            style={{ transform: 'translateX(-50%)' }}
            onClick={handleLogout}
          >
            Đăng xuất
          </CancelButton>

          <Modal
            title="Đổi mật khẩu"
            visible={isModalVisible}
            onOk={handleModalOk}
            okText="Đổi mật khẩu"
            cancelText="Hủy"
            onCancel={handleCancelModal}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Mật khẩu cũ</div>
              <Input
                type="password"
                name="oldPassword"
                placeholder="Mật khẩu cũ"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
                error={formik.errors.oldPassword && formik.touched.oldPassword ? formik.errors.oldPassword : false}
              />
              <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Mật khẩu mới</div>
              <Input
                type="password"
                name="newPassword"
                placeholder="Mật khẩu mới"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                error={formik.errors.newPassword && formik.touched.newPassword ? formik.errors.newPassword : false}
              />
              <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Xác nhận mật khẩu</div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={
                  formik.errors.confirmPassword && formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : false
                }
              />
            </form>
          </Modal>
        </div>
      );
    } else {
      return <EditInfo handleChangeView={() => setView({ type: 'view', createdAt: new Date() })} user={user} />;
    }
  };

  React.useEffect(() => {
    dispatch(getUser());
  }, [view]);

  return renderView();
};

export default SettingPage;
