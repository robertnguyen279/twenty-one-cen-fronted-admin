import { all } from 'redux-saga/effects';
import userSaga from './user.saga';
import productSaga from './product.saga';
import orderSagas from './order.saga';
import voucherSagas from './voucher.saga';
import blogSagas from './blog.saga';

export default function* rootSaga(): Generator {
  yield all([...userSaga, ...productSaga, ...orderSagas, ...voucherSagas, ...blogSagas]);
}
