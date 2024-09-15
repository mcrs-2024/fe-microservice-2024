// apicore
import { TLoginPayload, TMenu } from 'src/constants/types';
import { TUser } from 'src/constants/types/admin/user';
// constants
import { authentication } from 'src/helpers/auth';

import { AuthActionTypes } from './constants';

export const INIT_AUTH_STATE = {
  user: authentication.getLoggedInUser(),
  menus: authentication.getMenus(),
  permissions: [],
  currentPagePermissions: null,
  currentPage: null,
  loading: false,
  error: false,
  value: false,
  userSignUp: false,
  userLoggedIn: false,
  userLogout: false,
  screenLocked: false,
  passwordReset: false,
  passwordChange: false,
  resetPasswordSuccess: null,
};

interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.SIGNUP_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.LOCK_SCREEN
    | AuthActionTypes.RESET
    | AuthActionTypes.REDIRECT_PAGE;
  payload: {
    actionType?: string;
    data?: TLoginPayload | null;
    error?: string;
  };
}

export interface AuthStateTypes {
  user: TUser | null;
  menus: TMenu[] | null;
  currentPagePermissions: string[] | null;
  currentPage: string | null;
  loading: boolean;
  error: boolean;
  value: boolean;
  userSignUp: boolean;
  userLoggedIn: boolean;
  userLogout: boolean;
  screenLocked: boolean;
  passwordReset: boolean;
  passwordChange: boolean;
  resetPasswordSuccess: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Auth = (
  state: AuthStateTypes = INIT_AUTH_STATE,
  action: AuthActionType,
): any => {
  switch (action.type) {
    case AuthActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            user: action.payload.data?.user || null,
            menus: action.payload.data?.menus || [],
            permissions: action.payload.data?.permissions || [],
            userLoggedIn: true,
            screenLocked: false,
            loading: false,
          };
        }
        case AuthActionTypes.SIGNUP_USER: {
          return {
            ...state,
            user: action.payload.data,
            userSignUp: true,
            loading: false,
          };
        }

        case AuthActionTypes.LOGOUT_USER: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }

        case AuthActionTypes.FORGOT_PASSWORD: {
          return {
            ...state,
            resetPasswordSuccess: action.payload.data,
            loading: false,
            passwordReset: true,
          };
        }

        case AuthActionTypes.LOCK_SCREEN: {
          return {
            ...state,
            loading: false,
            screenLocked: true,
          };
        }

        case AuthActionTypes.REDIRECT_PAGE: {
          return {
            ...state,
            ...action.payload.data,
          };
        }

        default:
          return { ...state };
      }

    case AuthActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            user: null,
            menus: [],
            permissions: [],
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }

        case AuthActionTypes.FORGOT_PASSWORD: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }

        case AuthActionTypes.LOCK_SCREEN: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            screenLocked: false,
          };
        }

        case AuthActionTypes.REDIRECT_PAGE: {
          return {
            ...state,
            currentPagePermissions: [],
            currentPage: null,
          };
        }

        default:
          return { ...state };
      }

    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true, userLoggedIn: false };
    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        menus: [],
        permissions: [],
        userLogout: false,
        userLoggedIn: false,
      };
    case AuthActionTypes.LOCK_SCREEN:
      return { ...state, loading: true, screenLocked: false };
    case AuthActionTypes.RESET:
      return {
        ...state,
        ...INIT_AUTH_STATE,
      };
    case AuthActionTypes.REDIRECT_PAGE:
      return {
        ...state,
        currentPagePermissions: [],
        currentPage: null,
      };
    default:
      return { ...state };
  }
};

export default Auth;
