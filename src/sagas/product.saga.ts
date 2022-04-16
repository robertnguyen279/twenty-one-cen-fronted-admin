import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/product.action';
import * as api from 'apis/product.api';

function* getCategories() {
  try {
    const result = yield call(api.getCategories);
    if (result.data.message.includes('success')) {
      yield put(actions.getCategoriesSuccess(result.data.categories));
    }
  } catch (error) {
    yield put(actions.getCategoriesError());
  }
}

function* watchGetCategories() {
  yield takeEvery(actions.Types.GET_CATEGORY, getCategories);
}

const productSagas = [fork(watchGetCategories)];

export default productSagas;
