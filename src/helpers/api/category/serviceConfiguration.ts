import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterServiceConfig,
  TServiceConfig,
} from 'src/constants/types/category/serviceConfiguration';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useServiceConfiguration = (
  params?: TPagination,
  filter?: TFilterServiceConfig,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TServiceConfig>>
  >({ url: `/category/servicePerformConfig/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllServiceConfiguration = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TServiceConfig>
  >({
    url: `/category/servicePerformConfig/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const serviceConfigurationApi = {
  createServiceConfiguration: function (data: any) {
    return axiosClient({
      url: `/category/servicePerformConfig/create`,
      data: data,
    });
  },
  updateServiceConfiguration: function (data: any) {
    return axiosClient({
      url: `/category/servicePerformConfig/update`,
      data: data,
    });
  },
  deleteServiceConfiguration: function (id: string) {
    return axiosClient({
      url: `/category/servicePerformConfig/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default serviceConfigurationApi;
