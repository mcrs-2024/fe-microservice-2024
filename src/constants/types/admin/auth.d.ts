import { TPermissionByModule } from './permisson';

export type TUserInfoDecode = {
  userId: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
  authorities: string[];
};

export type TUserLoginResponseData = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
  menu: TMenu[];
  permissions: TPermissionByModule[];
};
export type TLoginPayload = {
  user: TUser;
  menus: TMenu[];
  permissions: TPermissionByModule[];
};

export type TUserLoginPayload = {
  username: string;
  password: string;
};
export type TUserSignUpPayload = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};
