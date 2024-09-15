import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TFilterSource, TSource } from 'src/constants/types/category/source';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useVisitSource = (
  params?: TPagination,
  filter?: TFilterSource,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TSource>>
  >({ url: `/category/visit-source-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllVisitSource = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TSource[]>>({
    url: `/category/visitSource/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const visitReasonApi = {
  createVisitReason: function (data: TSource) {
    return axiosClient({
      url: `/category/visitSource/create`,
      data: data,
    });
  },
  updateVisitReason: function (data: TSource) {
    return axiosClient({
      url: `/category/visitSource/update`,
      data: data,
    });
  },
  deleteVisitReason: function (id: string) {
    return axiosClient({
      url: `/category/visitSource/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default visitReasonApi;
