import {
  APIResponse,
  TFilterUsers,
  TPagination,
  TPaginationResponse,
  TUser,
} from 'src/constants/types';
import useSWR from 'swr';

import axiosClient from '../baseApi';

// account
const userApi = {
  createUser: function (data: any) {
    return axiosClient({
      url: '/admin/user/createUser',
      data: data,
    });
  },
  updateUser: function (data: any) {
    return axiosClient({
      url: '/admin/user/updateUser',
      data: data,
    });
  },
  getUsersCore: function (pagination: TPagination) {
    return axiosClient({
      url: '/admin/role/listByPage',
      data: pagination,
    });
  },
  searchUsers: function (filter: TFilterUsers, pagination: TPagination) {
    return axiosClient({
      url: '/admin/user/search',
      data: { ...filter, ...pagination },
    });
  },
  getRoles: function () {
    return axiosClient({
      url: '/admin/role/findAll',
    });
  },
  getAllUserInRoleByRoleId: function (roleId: string, pagination: TPagination) {
    return axiosClient({
      url: `/admin/user/getListUserByRole?roleId`,
      data: {
        roleId,
        ...pagination,
      },
    });
  },
  getAllUserNotInRoleByRoleId: function (
    roleId: string,
    pagination: TPagination,
  ) {
    return axiosClient({
      url: `/admin/user/getListUserByRole?roleId`,
      data: {
        roleId,
        ...pagination,
      },
    });
  },
  changeUserStatus: function (userId: string) {
    return axiosClient({
      url: `/admin/user/changeStatus`,
      params: {
        userId,
      },
    });
  },
  changeUserPassword: function (
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    return axiosClient({
      url: '/admin/auth/changePassword',
      params: {
        userId,
        oldPassword,
        newPassword,
      },
    });
  },
  deleteUser: function (userId: string) {
    return axiosClient({
      url: '/admin/user/deleteUser',
      params: {
        userId,
      },
    });
  },
};

export const useUsersByRole = (
  roleId: string | null,
  type: 'In' | 'NotIn',
  params?: TPagination,
) => {
  const { data, error, isLoading, mutate } = useSWR({
    url: `/admin/user/getAllUser${type}RoleByRoleId`,
    params: {
      roleId,
      ...params,
    },
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useUsers = (params: TPagination, filter: TFilterUsers) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TUser>>
  >({
    url: `/admin/user/search`,
    params,
    data: filter,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default userApi;
