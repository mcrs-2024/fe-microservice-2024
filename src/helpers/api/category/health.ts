import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TChapter, TFilterChapter } from 'src/constants/types/category/chapter';
import { TFilterHealth } from 'src/constants/types/category/health';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useHealth = (params?: TPagination, filter?: TFilterHealth) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TChapter>>
  >({ url: `/category/healthScore/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllHealth = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TChapter>>({
    url: `/category/healthScore/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const healthApi = {
  createHealth: function (data: TChapter) {
    return axiosClient({
      url: `/category/healthScore/create`,
      data: data,
    });
  },
  updateHealth: function (data: TChapter) {
    return axiosClient({
      url: `/category/healthScore/update`,
      data: data,
    });
  },
  deleteHealth: function (healthScoreCode: string) {
    return axiosClient({
      url: `/category/healthScore/deleteById`,
      params: {
        healthScoreCode,
      },
    });
  },
};

export default healthApi;
