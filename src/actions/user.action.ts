import { Action, LoginUser, ErrorType, User } from 'types';

export const Types = {
  GET_USER_SUCCESS: 'user/get-user-success',
  GET_USER: 'user/get-user',
  LOGIN_USER: 'user/login-user',
  ERROR: 'user/error',
  LOGIN_USER_ERROR: 'user/login-user-error',
  LOGIN_BY_GOOGLE: 'user/login-by-google',
  LOGIN_BY_FACEBOOK: 'user/login-by-facebook',
  CREATE_USER: 'user/create-user',
};

export const getUser = (): Action => ({
  type: Types.GET_USER,
});

export const getUserSuccess = (user: User): Action<User> => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    ...user,
  },
});

export const getUserError = (message: string): Action<ErrorType> => ({
  type: Types.ERROR,
  payload: { message },
});

export const loginUser = ({ emailOrPhone, password, remember }: LoginUser): Action<LoginUser> => ({
  type: Types.LOGIN_USER,
  payload: {
    emailOrPhone,
    password,
    remember,
  },
});

// export const loginUserError = (error: string): Action => ({
//   type: Types.LOGIN_USER_ERROR,
//   payload: {
//     error,
//   },
// });
