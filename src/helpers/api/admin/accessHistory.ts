import { TPagination } from 'src/constants/types';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGetAllAccessHistory = () => {
  const { data, error, isLoading, mutate } = useSWR(`/admin/history/findPage`);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useAccessHistory = (params: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR({
    url: `/admin/history/findPage`,
    params,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const accessHistoryApi = {
  baseUrl: '/admin/history',
  findByIdAccessHistory: function (payload: { id: string }) {
    return axiosClient({
      url: '/admin/history/findById',
      params: payload,
    });
  },
  deleteByIdAccessHistory: function (payload: { ids: string[] }) {
    return axiosClient({
      url: '/admin/history/deleteById',
      data: payload,
    });
  },
  deleteAllAccessHistory: function () {
    return axiosClient({
      url: '/admin/history/deleteAll',
    });
  },
};
