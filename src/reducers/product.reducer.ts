import { Types } from 'actions/product.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function products(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        getCategoriesError: null,
      };
    }
    case Types.GET_CATEGORY_ERROR: {
      return {
        ...state,
        getCategoriesError: `Get category fail ${Date.now()}`,
      };
    }
    default: {
      return state;
    }
  }
}
