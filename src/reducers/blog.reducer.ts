import { Types } from 'actions/blog.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function blogs(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_BLOGS_SUCCESS: {
      return {
        ...state,
        blogs: action.payload,
        getBlogsError: null,
      };
    }
    case Types.GET_BLOGS_ERROR: {
      return {
        ...state,
        getBlogsError: `${action.payload.message} ${Date.now()}`,
      };
    }
    default: {
      return state;
    }
  }
}
