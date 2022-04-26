import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from 'actions/blog.action';
import * as api from 'apis/blog.api';

function* getBlogs() {
  try {
    const result = yield call(api.getBlogs);
    if (result.data.message.includes('success')) {
      yield put(actions.getBlogsSuccess(result.data.posts));
    }
  } catch (error) {
    yield put(actions.getBlogsError(error.response.data.message));
  }
}

function* watchGetBlogs() {
  yield takeEvery(actions.Types.GET_BLOGS, getBlogs);
}

const blogSagas = [fork(watchGetBlogs)];

export default blogSagas;
