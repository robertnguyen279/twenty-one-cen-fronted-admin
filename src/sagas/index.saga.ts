import { all } from 'redux-saga/effects';
import userSaga from './user.saga';
import productSaga from './product.saga';

export default function* rootSaga(): Generator {
  yield all([...userSaga, ...productSaga]);
}
