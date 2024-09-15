import { TPagination } from 'src/constants/types';
import useSWR from 'swr';

import axiosClient from '../baseApi';

//System Logs
export const useGetAllSystemLogs = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/log/system/findPage`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useSystemLogs = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR({
    url: `/admin/log/system/findPage`,
    params,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const systemLogsApi = {
  baseUrl: '/admin/log/system',
  deleteByIdSystemLog: function (payload: { ids: string[] }) {
    return axiosClient({
      url: '/admin/log/system/deleteById',
      data: payload,
    });
  },
  deleteAllSystemLog: function () {
    return axiosClient({
      url: '/admin/log/system/deleteAll',
    });
  },
};

//Audit Logs
export const useAuditLogs = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/log/audit/findPage`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const auditLogsApi = {
  baseUrl: '/admin/log/audit',
  deleteByIdAuditLog: function (payload: { ids: string[] }) {
    return axiosClient({
      url: '/admin/log/audit/deleteById',
      data: payload,
    });
  },
  deleteAllAuditLog: function () {
    return axiosClient({
      url: 'admin/log/system/deleteAll',
    });
  },
};
