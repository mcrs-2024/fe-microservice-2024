/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from '@redux-saga/core';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  TUserLoginResponseData,
  TUserSignUpPayload,
} from 'src/constants/types/admin/auth';
import { signup } from 'src/helpers/api/auth';
// constants
import { authentication } from 'src/helpers/auth';
// apicore
import { setScreenLocked } from 'src/helpers/auth';

// helpers
import {
  forgotPassword as forgotPasswordApi,
  getPermissionsOfMenu,
  login as loginApi,
} from '../../helpers/';

// actions
import { authApiResponseError, authApiResponseSuccess } from './actions';
import { AuthActionTypes } from './constants';

interface IAuthPayload {
  payload: TUserSignUpPayload;
  type: string;
}

/**
 * Login the user
 * @param {*} payload - email and password
 */
function* login({
  payload: { username, password },
  type,
}: IAuthPayload): SagaIterator {
  try {
    const response = yield call(loginApi, { username, password });
    const user: TUserLoginResponseData = response.data.data;
    // NOTE - You can change this according to response format from your api
    authentication.setLoggedInUser(user['user']);
    authentication.setAccessToken(user['accessToken']);
    authentication.setMenus(user['menu']);
    authentication.setPermissions(user['permissions']);
    setScreenLocked(false);
    yield put(
      authApiResponseSuccess(AuthActionTypes.LOGIN_USER, {
        user: user['user'],
        menus: user['menu'],
        permissions: user['permissions'],
      }),
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    authentication.setLoggedInUser(null);
    authentication.setAccessToken(null);
    authentication.setMenus(null);
  }
}
function* redirectPage({
  payload: { nextPage },
}: {
  payload: { nextPage: string | null };
  type: string;
}): SagaIterator {
  if (nextPage === null) {
    yield put(
      authApiResponseError(AuthActionTypes.REDIRECT_PAGE, 'nextPage is empty'),
    );
    return;
  }
  const menus = authentication.getMenus();
  const pagePermissions = getPermissionsOfMenu(menus || [], nextPage);

  try {
    yield put(
      authApiResponseSuccess(AuthActionTypes.REDIRECT_PAGE, {
        nextPage,
        currentPagePermissions: pagePermissions,
      }),
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(
        AuthActionTypes.REDIRECT_PAGE,
        'get page permission failed',
      ),
    );
  }
}
function* signupUser({
  payload: { fullname, email, password },
}: IAuthPayload): SagaIterator {
  try {
    const response = yield call(signup, {
      fullname,
      emailaddress: email,
      password,
    });
    yield put(
      authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, response.data),
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
  }
}
/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    authentication.setLoggedInUser(null);
    authentication.setAccessToken(null);
    authentication.setMenus([]);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* forgotPassword({ payload: { email } }: IAuthPayload): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, { emailaddress: email });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data),
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}

function* lockScreen(): SagaIterator {
  try {
    setScreenLocked(true);
    yield put(authApiResponseSuccess(AuthActionTypes.LOCK_SCREEN, {}));
  } catch (error: any) {
    setScreenLocked(false);
    yield put(authApiResponseError(AuthActionTypes.LOCK_SCREEN, error));
  }
}

export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}
export function* watchRedirectPage() {
  yield takeEvery(AuthActionTypes.REDIRECT_PAGE, redirectPage);
}
export function* watchSignupUser() {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signupUser);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchLockScreen() {
  yield takeEvery(AuthActionTypes.LOCK_SCREEN, lockScreen);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchForgotPassword),
    fork(watchLockScreen),
    fork(watchSignupUser),
    fork(watchRedirectPage),
  ]);
}

export default authSaga;
