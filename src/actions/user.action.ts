import { Action, LoginUser, Message, User, DeleteUser, CreateUserByAdmin } from 'types';

export const Types = {
  GET_USER_SUCCESS: 'user/get-user-success',
  GET_USER_ERROR: 'user/get-user-error',
  GET_USERS_SUCCESS: 'user/get-users-success',
  GET_USER: 'user/get-user',
  LOGIN_USER: 'user/login-user',
  LOGIN_USER_ERROR: 'user/login-user-error',
  GET_USERS: 'users/get-users',
  GET_USERS_ERROR: 'users/get-users-error',
  DELETE_USER: 'user/delete-user',
  DELETE_USER_BY_ADMIN: 'user/delete-user-admin',
  DELETE_USER_ERROR: 'user/delete-user-error',
  DELETE_USER_SUCCESS: 'user/delete-user-success',
  CREATE_USER_BY_ADMIN: 'user/create-user-by-admin',
  CREATE_USER_BY_ADMIN_SUCCESS: 'user/create-user-by-admin-success',
  CREATE_USER_BY_ADMIN_ERROR: 'user/create-user-by-admin-error',
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

export const getUserError = (message: string): Action<Message> => ({
  type: Types.GET_USER_ERROR,
  payload: { message },
});

export const getUsersSuccess = (users: Array<User>): Action<Array<User>> => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    ...users,
  },
});

export const getUsersError = (message: string): Action<Message> => ({
  type: Types.GET_USERS_ERROR,
  payload: { message },
});

export const loginUserError = (message: string): Action<Message> => ({
  type: Types.LOGIN_USER_ERROR,
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

export const createUserByAdmin = ({
  email,
  firstName,
  lastName,
  role,
  password,
}: CreateUserByAdmin): Action<CreateUserByAdmin> => ({
  type: Types.CREATE_USER_BY_ADMIN,
  payload: {
    email,
    firstName,
    lastName,
    role,
    password,
  },
});

export const createUserByAdminError = (message: string): Action<Message> => ({
  type: Types.CREATE_USER_BY_ADMIN_ERROR,
  payload: { message },
});

export const createUserByAdminSuccess = (): Action => ({
  type: Types.CREATE_USER_BY_ADMIN_SUCCESS,
});

export const deleteUser = (id: string): Action<DeleteUser> => ({
  type: Types.DELETE_USER,
  payload: { id },
});

export const deleteUserByAdmmin = (id: string): Action<DeleteUser> => ({
  type: Types.DELETE_USER_BY_ADMIN,
  payload: { id },
});

export const deleteUserSuccess = (): Action => ({
  type: Types.DELETE_USER_SUCCESS,
});

export const deleteUserError = (message: string): Action<Message> => ({
  type: Types.DELETE_USER_ERROR,
  payload: { message },
});
