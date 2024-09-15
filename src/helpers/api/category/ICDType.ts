import { url } from 'inspector';
import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TFilterICDType, TICDType } from 'src/constants/types/category/icdType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useICDType = (params?: TPagination, filter?: TFilterICDType) => {
  const { data, isLoading, error, mutate } = useSWR<
    APIResponse<TPaginationResponse<TICDType>>
  >({
    url: '/category/icd-type-ref/find-page',
    params,
    data: filter,
  });
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export const useGetAllICDType = () => {
  const { data, isLoading, error, mutate } = useSWR<APIResponse<TICDType[]>>({
    url: '/category/icd-type-ref/find-all',
  });
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

const icdTypeAPI = {
  createICDType: function (data: TICDType) {
    return axiosClient({
      url: '/category/icd-type-ref/create',
      data: data,
    });
  },
  updateICDType: function (data: TICDType) {
    return axiosClient({
      url: '/category/icd-type-ref/update',
      data: data,
    });
  },
  deleteICDType: function (id: string | null) {
    return axiosClient({
      url: '/category/icd-type-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default icdTypeAPI;
