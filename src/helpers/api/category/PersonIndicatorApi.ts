import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPersonIndicator,
  TPersonIndicator,
} from 'src/constants/types/category/PersonIndicator';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePersonIndicator = (
  params?: TPagination,
  filter?: TFilterPersonIndicator,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPersonIndicator>>
  >({ url: `/category/personIndicatorType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPersonIndicator = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPersonIndicator>
  >({
    url: `/category/personIndicatorType/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const personIndicatorApi = {
  createPersonIndicator: function (data: TPersonIndicator) {
    return axiosClient({
      url: `/category/personIndicatorType/create`,
      data: data,
    });
  },
  updatePersonIndicator: function (data: TPersonIndicator) {
    return axiosClient({
      url: `/category/personIndicatorType/update`,
      data: data,
    });
  },
  deletePersonIndicator: function (personIndicatorTypeCode: string) {
    return axiosClient({
      url: `/category/personIndicatorType/deleteById`,
      params: {
        personIndicatorTypeCode,
      },
    });
  },
};

export default personIndicatorApi;
