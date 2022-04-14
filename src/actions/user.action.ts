import { Action, LoginUser, ErrorType, User, DeleteUser } from 'types';

export const Types = {
  GET_USER_SUCCESS: 'user/get-user-success',
  GET_USERS_SUCCESS: 'user/get-users-success',
  GET_USER: 'user/get-user',
  LOGIN_USER: 'user/login-user',
  ERROR: 'user/error',
  GET_USERS: 'users/get-users',
  DELETE_USER: 'user/delete-user',
};

export const getUser = (): Action => ({
  type: Types.GET_USER,
});

export const getUsers = (): Action => ({
  type: Types.GET_USERS,
});

export const getUserSuccess = (user: User): Action<User> => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    ...user,
  },
});

export const getUsersSuccess = (users: Array<User>): Action<Array<User>> => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    ...users,
  },
});

export const displayError = (message: string): Action<ErrorType> => ({
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

export const deleteUser = (id: string): Action<DeleteUser> => ({
  type: Types.DELETE_USER,
  payload: { id },
});
