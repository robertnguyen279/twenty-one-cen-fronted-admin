import { Types } from 'actions/user.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function users(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserError: null,
      };
    }
    case Types.GET_USER_ERROR: {
      return {
        ...state,
        getUserError: action.payload.message,
      };
    }
    case Types.LOGIN_USER_ERROR: {
      return {
        ...state,
        loginError: action.payload.message,
      };
    }
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        getUsersError: null,
        createUserByAdminError: null,
        createUserByAdminSuccess: null,
      };
    }
    case Types.GET_USERS_ERROR: {
      return {
        ...state,
        getUsersError: action.payload.message,
      };
    }
    case Types.DELETE_USER_ERROR: {
      return {
        ...state,
        deleteUserError: action.payload.message,
      };
    }
    case Types.DELETE_USER_SUCCESS: {
      return {
        ...state,
        deleteUserSuccess: `Delete user successfully ${Date.now()}`,
      };
    }
    case Types.CREATE_USER_BY_ADMIN_ERROR: {
      return {
        ...state,
        createUserByAdminError: action.payload.message,
      };
    }
    case Types.CREATE_USER_BY_ADMIN_SUCCESS: {
      return {
        ...state,
        createUserByAdminSuccess: `Create user by admin successfully ${Date.now()}`,
      };
    }

    default: {
      return state;
    }
  }
}
