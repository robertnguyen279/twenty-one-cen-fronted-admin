import { Types } from 'actions/user.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function users(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        errorMessage: null,
      };
    }
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        errorMessage: null,
      };
    }
    case Types.ERROR: {
      return {
        ...state,
        errorMessage: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}
