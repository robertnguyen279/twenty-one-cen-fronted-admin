import { takeEvery, call, put, fork, takeLatest } from 'redux-saga/effects';
import * as actions from 'actions/product.action';
import * as api from 'apis/product.api';
import { Action, CreateProduct, DeleteProduct } from 'types';

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

function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    if (result.data.message.includes('success')) {
      yield put(actions.getProductsSuccess(result.data.products));
    }
  } catch (error) {
    yield put(actions.getProductsError(error.response.data.message));
  }
}

function* watchGetProducts() {
  yield takeEvery(actions.Types.GET_PRODUCTS, getProducts);
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

function* deleteProduct(action: Action<DeleteProduct>) {
  try {
    const { id } = action.payload;
    const result = yield call(api.deleteProduct, { id });
    if (result.data.message.includes('successfully')) {
      yield put(actions.deleteProductSuccess());
    }
  } catch (e) {
    yield put(actions.deleteProductError());
  }
}

function* watchDeleteProduct() {
  yield takeLatest(actions.Types.DELETE_PRODUCT, deleteProduct);
}

const productSagas = [
  fork(watchGetCategories),
  fork(watchCreateProduct),
  fork(watchGetProducts),
  fork(watchDeleteProduct),
];

export default productSagas;
