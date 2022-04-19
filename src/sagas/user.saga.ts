import { takeEvery, call, put, fork, takeLatest } from 'redux-saga/effects';
import * as actions from 'actions/user.action';
import * as api from 'apis/user.api';
import { Action, LoginUser, DeleteUser, CreateUserByAdmin } from 'types';

function* getUser() {
  try {
    const result = yield call(api.getUser);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    yield put(actions.getUserError(`${e.response.data.message} ${Date.now()}`));
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
    yield put(actions.getUsersError(`Lỗi khi tải dữ liệu ${Date.now()}`));
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
    yield put(actions.loginUserError(`${e.response.data.message} ${Date.now()}`));
  }
}

function* watchLoginUser() {
  yield takeLatest(actions.Types.LOGIN_USER, loginUser);
}

function* deleteUser(action: Action<DeleteUser>) {
  try {
    const { id } = action.payload;
    const result = yield call(api.deleteUser, id);
    if (result.data.message.includes('successfully')) {
      yield put(actions.deleteUserSuccess());
    }
  } catch (e) {
    yield put(actions.deleteUserError(`Xóa người dùng thất bại ${Date.now()}`));
  }
}

function* watchDeleteUser() {
  yield takeLatest(actions.Types.DELETE_USER, deleteUser);
}

function* deleteUserByAdmin(action: Action<DeleteUser>) {
  try {
    const { id } = action.payload;
    const result = yield call(api.deleteUserByAdmin, id);
    if (result.data.message.includes('successfully')) {
      yield put(actions.deleteUserSuccess());
    }
  } catch (e) {
    yield put(actions.deleteUserError(`Xóa người dùng thất bại ${Date.now()}`));
  }
}

function* watchDeleteUserByAdmin() {
  yield takeLatest(actions.Types.DELETE_USER_BY_ADMIN, deleteUserByAdmin);
}

function* createUserByAdmin(action: Action<CreateUserByAdmin>) {
  try {
    const { email, firstName, lastName, password, role } = action.payload;
    const result = yield call(api.createUserByAdmin, { email, firstName, lastName, password, role });

    if (result.data.message.includes('success')) {
      yield put(actions.createUserByAdminSuccess());
    }
  } catch (e) {
    yield put(actions.createUserByAdminError(`${e.response.data.message} ${Date.now()}`));
  }
}

function* watchCreateUserByAdmin() {
  yield takeLatest(actions.Types.CREATE_USER_BY_ADMIN, createUserByAdmin);
}

const userSagas = [
  fork(watchGetUser),
  fork(watchGetUsers),
  fork(watchLoginUser),
  fork(watchDeleteUser),
  fork(watchDeleteUserByAdmin),
  fork(watchCreateUserByAdmin),
];

export default userSagas;
