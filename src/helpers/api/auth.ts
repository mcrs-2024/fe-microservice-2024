import { TUserLoginPayload } from 'src/constants/types';

import axiosClient from './baseApi';

function login(data: TUserLoginPayload) {
  const baseUrl = '/secured/auth/klogin';
  return axiosClient({
    url: `${baseUrl}`,
    data: data,
  });
}
function signup(data: {
  fullname: string;
  emailaddress: string;
  password: string;
}) {
  const baseUrl = '/admin/auth/register';
  return axiosClient({
    url: `${baseUrl}`,
    data: data,
  });
}

function forgotPassword(params: { emailaddress: string }) {
  const baseUrl = '/settings/user/forgotPassword';
  return axiosClient({
    url: baseUrl,
    params,
  });
}

function updatePassword(data: {
  userid: string;
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}) {
  const baseUrl = '/settings/user/updatePassword';
  return axiosClient({
    url: baseUrl,
    data: data,
  });
}

export { forgotPassword, login, signup, updatePassword };
