import { all } from 'redux-saga/effects';
import userSaga from './user.saga';
import productSaga from './product.saga';
import orderSagas from './order.saga';

export default function* rootSaga(): Generator {
  yield all([...userSaga, ...productSaga, ...orderSagas]);
}
