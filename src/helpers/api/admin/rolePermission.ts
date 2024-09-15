import { APIResponse } from 'src/constants/types';
import { TModule } from 'src/constants/types/admin/module';
import {
  TPermission,
  TRolePermissions,
} from 'src/constants/types/admin/permisson';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGetAllModules = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TModule[]>>(
    `/admin/module/findAll`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPermissions = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPermission[]>>(
    `/admin/permission/findAll`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetRolePermissionByModule = (moduleId: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TRolePermissions[]>
  >(
    moduleId
      ? {
          url: `/admin/module/getPermissionsOfRolesByModule`,
          params: {
            moduleId,
          },
        }
      : null,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const rolePermissionsApi = {
  assignPermissionToRoleByModule: function (payload: {
    moduleId: number;
    data: TRolePermissions[];
  }) {
    return axiosClient({
      url: '/admin/module/assignPermissionToRoleByModule',
      params: { moduleId: payload.moduleId },
      data: payload.data,
    });
  },
};
