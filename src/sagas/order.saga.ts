import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/order.action';
import * as api from 'apis/order.api';

function* getOrders() {
  try {
    const result = yield call(api.getOrders);
    if (result.data.message.includes('success')) {
      yield put(actions.getOrdersSuccess(result.data.orders));
    }
  } catch (error) {
    yield put(actions.getOrdersError(error.response.data.message));
  }
}

function* watchGetOrders() {
  yield takeEvery(actions.Types.GET_ORDERS, getOrders);
}

const orderSagas = [fork(watchGetOrders)];

export default orderSagas;
