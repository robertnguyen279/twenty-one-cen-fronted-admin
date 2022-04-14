import { takeEvery, call, put, fork, takeLatest } from 'redux-saga/effects';
import * as actions from 'actions/user.action';
import * as api from 'apis/user.api';
import { Action, LoginUser } from 'types';
import { v4 as uuid } from 'uuid';

function* getUser() {
  try {
    const result = yield call(api.getUser);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    yield put(actions.displayError(`Không tìm thấy người dùng ${uuid()}`));
  }
}

function* watchGetUser() {
  yield takeEvery(actions.Types.GET_USER, getUser);
}

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ ...result.data.users }));
  } catch (e) {
    yield put(actions.displayError(`Lỗi khi tải dữ liệu ${uuid()}`));
  }
}

function* watchGetUsers() {
  yield takeEvery(actions.Types.GET_USERS, getUsers);
}

function* loginUser(action: Action<LoginUser>) {
  try {
    const { emailOrPhone, password, remember } = action.payload;

    const result = yield call(api.loginUser, { emailOrPhone, password });

    if (remember) {
      localStorage.setItem(
        '21cenAuthTokens',
        JSON.stringify({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }),
      );
    }

    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    yield put(actions.displayError(`${e.response.data.message} ${uuid()}`));
  }
}

function* watchLoginUser() {
  yield takeLatest(actions.Types.LOGIN_USER, loginUser);
}

// function* loginByGoogle(action: Action) {
//   try {
//     const result = yield call(api.loginByGoogle, action.payload);
//     localStorage.setItem('beehive-auth', result.data.token);
//     yield put(actions.getUserSuccess({ ...result.data.user }));
//   } catch (e) {
//     if (e.response.data.code === 11000) {
//       yield put(actions.loginUserError('User existed - ' + uuid()));
//     }
//   }
// }

// function* watchLoginByGoogle() {
//   yield takeLatest(actions.Types.LOGIN_BY_GOOGLE, loginByGoogle);
// }

// function* loginByFacebook(action: Action) {
//   try {
//     const result = yield call(api.loginByFacebook, action.payload);
//     localStorage.setItem('beehive-auth', result.data.token);
//     yield put(actions.getUserSuccess({ ...result.data.user }));
//   } catch (e) {
//     if (e.response.data.code === 11000) {
//       yield put(actions.loginUserError('User existed - ' + uuid()));
//     }
//   }
// }

// function* watchLoginByFacebook() {
//   yield takeLatest(actions.Types.LOGIN_BY_FACEBOOK, loginByFacebook);
// }

// function* createUser(action: Action) {
//   try {
//     const result = yield call(api.createUser, action.payload);
//     localStorage.setItem('beehive-auth', result.data.token);
//     yield put(actions.getUserSuccess({ ...result.data.user }));
//   } catch (e) {
//     if (e.response.data.code === 11000) {
//       yield put(actions.loginUserError('User existed - ' + uuid()));
//     }
//   }
// }

// function* watchCreateUser() {
//   yield takeLatest(actions.Types.CREATE_USER, createUser);
// }

const userSagas = [
  fork(watchGetUser),
  fork(watchGetUsers),
  fork(watchLoginUser),
  // fork(watchLoginByGoogle),
  // fork(watchLoginByFacebook),
  // fork(watchCreateUser),
];

export default userSagas;
