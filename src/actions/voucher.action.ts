import { Action, Voucher } from 'types';

export const Types = {
  GET_VOUCHERS: 'voucher/get-vouchers',
  GET_VOUCHERS_SUCCESS: 'voucher/get-vouchers-success',
  GET_VOUCHERS_ERROR: 'voucher/get-vouchers-error',
};

export const getVouchers = (): Action => ({
  type: Types.GET_VOUCHERS,
});

export const getVoucherSuccess = (products: Array<Voucher>): Action<Array<Voucher>> => ({
  type: Types.GET_VOUCHERS_SUCCESS,
  payload: products,
});

export const getVoucherError = (message: string): Action => ({
  type: Types.GET_VOUCHERS_ERROR,
  payload: { message },
});
