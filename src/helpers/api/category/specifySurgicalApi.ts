import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterSpecifySurgical,
  TSpecifySurgical,
} from 'src/constants/types/category/specifySurgical';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useSpecifySurgical = (
  params?: TPagination,
  filter?: TFilterSpecifySurgical,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TSpecifySurgical>>
  >({
    url: `/category/specify-surgical-group-ref/find-page`,
    params,
    data: filter,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllSpecifySurgical = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TSpecifySurgical>
  >({
    url: `/category/specify-surgical-group-ref/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const specifySurgicalApi = {
  createSpecifySurgical: function (data: TSpecifySurgical) {
    return axiosClient({
      url: `/category/specify-surgical-group-ref/create`,
      data: data,
    });
  },
  updateSpecifySurgical: function (data: TSpecifySurgical) {
    return axiosClient({
      url: `/category/specify-surgical-group-ref/update`,
      data: data,
    });
  },
  deleteSpecifySurgical: function (id: string) {
    return axiosClient({
      url: `/category/specify-surgical-group-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default specifySurgicalApi;
