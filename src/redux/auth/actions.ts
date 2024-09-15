// constants
import { TLoginPayload, TUserSignUpPayload } from 'src/constants/types';

import { AuthActionTypes } from './constants';
export interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.FORGOT_PASSWORD
    | AuthActionTypes.FORGOT_PASSWORD_CHANGE
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.LOCK_SCREEN
    | AuthActionTypes.RESET
    | AuthActionTypes.SIGNUP_USER
    | AuthActionTypes.REDIRECT_PAGE;

  payload: object | string;
}

// common success

export const authApiResponseSuccess = (
  actionType: string,
  data: TLoginPayload | object,
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,

  payload: { actionType, data },
});

// common error

export const authApiResponseError = (
  actionType: string,
  error: string,
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,

  payload: { actionType, error },
});

export const loginUser = (
  username: string,
  password: string,
): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,

  payload: { username, password },
});
export const redirectPage = (nextPage: string | null): AuthActionType => ({
  type: AuthActionTypes.REDIRECT_PAGE,
  payload: { nextPage },
});
export const signupUser = (data: TUserSignUpPayload): AuthActionType => ({
  type: AuthActionTypes.SIGNUP_USER,

  payload: { data },
});

export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,

  payload: {},
});

export const forgotPassword = (emailaddress: string): AuthActionType => ({
  type: AuthActionTypes.FORGOT_PASSWORD,

  payload: { emailaddress },
});

export const resetAuth = (): AuthActionType => ({
  type: AuthActionTypes.RESET,

  payload: {},
});

export const lockScreen = (): AuthActionType => ({
  type: AuthActionTypes.LOCK_SCREEN,

  payload: {},
});
