import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterRevenueGroups,
  TRevenueGroups,
} from 'src/constants/types/category/revenueGroups';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useRevenueGroup = (
  params?: TPagination,
  filter?: TFilterRevenueGroups,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TRevenueGroups>>
  >({ url: `/category/itemGroupRevenueRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllRevenueGroup = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TRevenueGroups>
  >({
    url: `/category/itemGroupRevenueRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const revenueGroupApi = {
  createRevenueGroup: function (data: TRevenueGroups) {
    return axiosClient({
      url: `/category/itemGroupRevenueRef/create`,
      data: data,
    });
  },
  updateRevenueGroup: function (data: TRevenueGroups) {
    return axiosClient({
      url: `/category/itemGroupRevenueRef/update`,
      data: data,
    });
  },
  deleteRevenueGroup: function (id: string) {
    return axiosClient({
      url: `/category/itemGroupRevenueRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default revenueGroupApi;
