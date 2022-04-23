import { Types } from 'actions/order.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function orders(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        getOrdersError: null,
      };
    }
    case Types.GET_ORDERS_ERROR: {
      return {
        ...state,
        getOrdersError: `${action.payload.message} ${Date.now()}`,
      };
    }
    default: {
      return state;
    }
  }
}
