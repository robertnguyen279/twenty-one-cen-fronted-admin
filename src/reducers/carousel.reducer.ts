import { Types } from 'actions/carousel.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function carousels(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_CAROUSELS_SUCCESS: {
      return {
        ...state,
        carousels: action.payload,
        getCarouselsError: null,
      };
    }
    case Types.GET_CAROUSELS_ERROR: {
      return {
        ...state,
        getCarouselsError: `${action.payload.message} ${Date.now()}`,
      };
    }
    default: {
      return state;
    }
  }
}
