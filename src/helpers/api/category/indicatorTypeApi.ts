import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterIndicatorType,
  TIndicatorType,
} from 'src/constants/types/category/indicatorType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useIndicatorType = (
  params?: TPagination,
  filter?: TFilterIndicatorType,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TIndicatorType>>
  >({ url: `/category/person-indicator-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllIndicatorType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TIndicatorType[]>
  >({
    url: `/category/person-indicator-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const indicatorTypeApi = {
  createIndicatorType: function (data: TIndicatorType) {
    return axiosClient({
      url: `/category/person-indicator-ref/create`,
      data: data,
    });
  },
  updateIndicatorType: function (data: TIndicatorType) {
    return axiosClient({
      url: `/category/person-indicator-ref/update`,
      data: data,
    });
  },
  deleteIndicatorType: function (id: string) {
    return axiosClient({
      url: `/category/person-indicator-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default indicatorTypeApi;
