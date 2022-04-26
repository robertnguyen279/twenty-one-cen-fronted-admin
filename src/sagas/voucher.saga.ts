import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/voucher.action';
import * as api from 'apis/voucher.api';

function* getVouchers() {
  try {
    const result = yield call(api.getVouchers);
    if (result.data.message.includes('success')) {
      yield put(actions.getVoucherSuccess(result.data.vouchers));
    }
  } catch (error) {
    yield put(actions.getVoucherError(error.response.data.message));
  }
}

function* watchGetVouchers() {
  yield takeEvery(actions.Types.GET_VOUCHERS, getVouchers);
}

const voucherSagas = [fork(watchGetVouchers)];

export default voucherSagas;
