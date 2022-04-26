import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/carousel.action';
import * as api from 'apis/carousel.api';

function* getCarousels() {
  try {
    const result = yield call(api.getCarousels);
    if (result.data.message.includes('success')) {
      yield put(actions.getCarouselsSuccess(result.data.carousels));
    }
  } catch (error) {
    yield put(actions.getBlogsError(error.response.data.message));
  }
}

function* watchGetCarousels() {
  yield takeEvery(actions.Types.GET_CAROUSELS, getCarousels);
}

const carouselSagas = [fork(watchGetCarousels)];

export default carouselSagas;
