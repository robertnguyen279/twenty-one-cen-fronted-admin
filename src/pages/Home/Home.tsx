import React, { useEffect, useState } from 'react';
import HomeWallpaper from 'assets/pictures/login-wallpaper.jpg';
import { Input, CheckBox } from 'components/Form';
import { RootState } from 'reducers/index.reducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserIcon from 'assets/icons/user-svgrepo-com.svg';
import Button from 'components/Button';
import PasswordIcon from 'assets/icons/key-svgrepo-com.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, getUser } from 'actions/user.action';
import { useHistory } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { message } from 'antd';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const loginError = useSelector((state: RootState) => state.userReducer.loginError);
  const getUserError = useSelector((state: RootState) => state.userReducer.getUserError);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      emailOrPhone: '',
      password: '',
      remember: undefined,
    },
    validationSchema: Yup.object().shape({
      emailOrPhone: Yup.string().required('Bạn phải nhập mục này'),
      password: Yup.string().min(6, 'Mật khẩu quá ngắn').max(20, 'Mật khẩu quá dài').required('Bạn phải nhập mục này'),
    }),
    onSubmit: ({ emailOrPhone, password, remember }) => {
      dispatch(loginUser({ emailOrPhone, password, remember }));
    },
  });

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter') {
      formik.submitForm();
    }
  };

  useEffect(() => {
    if (user && user.role !== 'user') {
      history.push('/dashboard');
    } else if (user && user.role === 'user') {
      message.error('Bạn không có quyền đăng nhập');
    } else {
      dispatch(getUser());
    }
  }, [user]);

  useEffect(() => {
    if (loginError) {
      if (loginError.includes('User not found')) {
        message.error('Sai tên đăng nhập');
      }

      if (loginError.includes('Wrong password')) {
        message.error('Sai mật khẩu');
      }
    }
  }, [loginError]);

  useEffect(() => {
    if (getUserError) {
      setLoading(false);
    }
  }, [getUserError]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="home" onKeyPress={handleKeyboardEvent} tabIndex={0}>
      <div className="home__layer--img" style={{ background: `url('${HomeWallpaper}')` }}></div>
      <div className="home__layer--blur"></div>
      <div className="home__container">
        <div className="login__container">
          <form onSubmit={formik.handleSubmit}>
            <div className="login__title pb-2">Đăng nhập</div>
            <div className="login__key my-2">Tên đăng nhập</div>
            <Input
              type="text"
              name="emailOrPhone"
              placeholder="Email hoặc số điện thoại"
              onChange={formik.handleChange}
              prefixIcon={UserIcon}
              value={formik.values.emailOrPhone}
              error={formik.errors.emailOrPhone && formik.touched.emailOrPhone ? formik.errors.emailOrPhone : false}
            />
            <div className="login__key my-2">Mật khẩu</div>
            <Input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={formik.handleChange}
              prefixIcon={PasswordIcon}
              value={formik.values.password}
              error={formik.errors.password && formik.touched.password ? formik.errors.password : false}
            />
            <div className="flex justify-between items-center w-4/6 my-3">
              <CheckBox name="remember" value="remember" label="Ghi nhớ đăng nhập" onChange={formik.handleChange} />
            </div>
            <Button className="login__container__button w-4/6 my-2 relative" type="submit">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
