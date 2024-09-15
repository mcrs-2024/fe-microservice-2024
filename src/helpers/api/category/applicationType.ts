import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TApplicationType,
  TFilterApplicationType,
} from 'src/constants/types/category/applicationType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useApplicationType = (
  params?: TPagination,
  filter?: TFilterApplicationType,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TApplicationType>>
  >({ url: `/category/applicationType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllApplicationType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TApplicationType>
  >({
    url: `/category/applicationType/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const applicationTypeApi = {
  createApplicationTypeApi: function (data: TApplicationType) {
    return axiosClient({
      url: `/category/applicationType/create`,
      data: data,
    });
  },
  updateApplication: function (data: TApplicationType) {
    return axiosClient({
      url: `/category/applicationType/update`,
      data: data,
    });
  },
  deleteApplication: function (applicationTypeCode: string) {
    return axiosClient({
      url: `/category/applicationType/deleteById`,
      params: {
        applicationTypeCode,
      },
    });
  },
};

export default applicationTypeApi;
