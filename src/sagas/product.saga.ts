import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/product.action';
import * as api from 'apis/product.api';
import { Action, CreateProduct } from 'types';

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

function* createProduct(action: Action<CreateProduct>) {
  try {
    const submitObject = action.payload;

    const result = yield call(api.createProduct, submitObject);

    if (result.data.message.includes('success')) {
      yield put(actions.createProductSuccess());
    }
  } catch (error) {
    yield put(actions.createProductError(`${error.response.data.message} ${Date.now()}`));
  }
}

function* watchCreateProduct() {
  yield takeEvery(actions.Types.CREATE_PRODUCT, createProduct);
}

const productSagas = [fork(watchGetCategories), fork(watchCreateProduct)];

export default productSagas;
