/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from 'jwt-decode';
import config from 'src/config';
import { SESSION_STORAGE } from 'src/constants/common/stogare';
import { UserStatus } from 'src/constants/enums/User';
import { TUserInfoDecode } from 'src/constants/types/admin/auth';
import { TMenu } from 'src/constants/types/admin/menu';
import { TPermissionByModule } from 'src/constants/types/admin/permisson';
import { TUser } from 'src/constants/types/admin/user';

import axiosClient from './api/baseApi';
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
  if (token)
    axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else delete axiosClient.defaults.headers.common['Authorization'];
};
// Lock screen
const setScreenLocked = (locked: boolean) => {
  sessionStorage.setItem(config.AUTH_LOCK_SCREEN_KEY, JSON.stringify(locked));
};

const getUserFromCookie = (): TUser | null => {
  const user = sessionStorage.getItem(SESSION_STORAGE.USER);
  return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
const getAccessToken = () => {
  const token = sessionStorage.getItem(SESSION_STORAGE.ACCESS_TOKEN);

  return token ? token : null;
};

/**
 * Check if token available in session
 */
// const user = getUserFromCookie();
const accessToken = getAccessToken();
if (accessToken) {
  setAuthorization(accessToken);
}

class Authentication {
  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    const accessToken = getAccessToken();
    if (!user || !accessToken) {
      return false;
    }
    try {
      const decoded: TUserInfoDecode = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  isForceChangePassword = () => {
    const user = this.getLoggedInUser();
    if (!user) {
      return false;
    }
    return user.status === UserStatus.FORCE_CHANGE_PASSWORD;
  };

  setLoggedInUser = (user: TUser | null) => {
    if (user)
      sessionStorage.setItem(SESSION_STORAGE.USER, JSON.stringify(user));
    else {
      sessionStorage.removeItem(SESSION_STORAGE.USER);
    }
  };
  setAccessToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem(SESSION_STORAGE.ACCESS_TOKEN, token);
      setAuthorization(token);
    } else {
      sessionStorage.removeItem(SESSION_STORAGE.ACCESS_TOKEN);
      setAuthorization(null);
    }
  };
  setMenus = (menus: TMenu[] | null) => {
    if (menus) {
      sessionStorage.setItem(SESSION_STORAGE.MENU, JSON.stringify(menus));
    } else {
      sessionStorage.removeItem(SESSION_STORAGE.MENU);
    }
  };
  setPermissions = (permissions: TPermissionByModule[]) => {
    if (permissions) {
      sessionStorage.setItem(
        SESSION_STORAGE.PERMISSIONS,
        JSON.stringify(permissions),
      );
    } else {
      sessionStorage.removeItem(SESSION_STORAGE.PERMISSIONS);
    }
  };
  getPermissions = () => {
    const permissions = sessionStorage.getItem(SESSION_STORAGE.PERMISSIONS);
    return permissions
      ? (JSON.parse(permissions) as TPermissionByModule[])
      : null;
  };

  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromCookie();
  };
  getMenus = () => {
    const menus = sessionStorage.getItem(SESSION_STORAGE.MENU);
    return menus ? JSON.parse(menus) : null;
  };

  setUserInSession = (modifiedUser: any) => {
    const userInfo = sessionStorage.getItem(SESSION_STORAGE.USER);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };

  isScreenLocked = () => {
    const screenLocked = sessionStorage.getItem(config.AUTH_LOCK_SCREEN_KEY);
    return screenLocked === 'true';
  };
}
const authentication = new Authentication();

export { Authentication, authentication, setAuthorization, setScreenLocked };
