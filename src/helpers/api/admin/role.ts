import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TRole, TRoleCreatePayload } from 'src/constants/types/admin/role';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGetAllRoles = () => {
  const { data, error, isLoading, mutate } =
    useSWR<APIResponse<TRole[]>>(`/admin/role/findAll`);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useRoles = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TRole[]>>
  >({
    url: `/admin/role/findPage`,
    params,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const rolesApi = {
  baseUrl: '/admin/role',
  addRole: function (payload: TRoleCreatePayload) {
    return axiosClient({
      url: '/admin/role/add',
      data: payload,
    });
  },
  updateRole: function (payload: TRoleCreatePayload) {
    return axiosClient({
      url: '/admin/role/update',
      data: payload,
    });
  },
  deleteRole: function (payload: { ids: string[] }) {
    return axiosClient({
      url: '/admin/role/deleteById',
      data: payload,
    });
  },
  assignUser: function (payload: { roleId: string; userIds: string[] }) {
    return axiosClient({
      url: '/admin/role/assignUser',
      data: payload,
    });
  },
  removeUser: function (payload: { roleId: string; userIds: string[] }) {
    return axiosClient({
      url: '/admin/role/removeUser',
      data: payload,
    });
  },
};
