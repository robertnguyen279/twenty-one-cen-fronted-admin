import { Action, Order } from 'types';

export const Types = {
  GET_ORDERS: 'order/get-orders',
  GET_ORDERS_SUCCESS: 'order/get-orders-success',
  GET_ORDERS_ERROR: 'order/get-orders-error',
};

export const getOrders = (): Action => ({
  type: Types.GET_ORDERS,
});

export const getOrdersSuccess = (products: Array<Order>): Action<Array<Order>> => ({
  type: Types.GET_ORDERS_SUCCESS,
  payload: products,
});

export const getOrdersError = (message: string): Action => ({
  type: Types.GET_ORDERS_ERROR,
  payload: { message },
});
