import { Types } from 'actions/voucher.action';
import { Action } from 'types';

const INITIAL_STATE = {};

export default function vouchers(state = INITIAL_STATE, action: Action): any {
  switch (action.type) {
    case Types.GET_VOUCHERS_SUCCESS: {
      return {
        ...state,
        vouchers: action.payload,
        getVouchersError: null,
      };
    }
    case Types.GET_VOUCHERS_ERROR: {
      return {
        ...state,
        getVouchersError: `${action.payload.message} ${Date.now()}`,
      };
    }
    default: {
      return state;
    }
  }
}
