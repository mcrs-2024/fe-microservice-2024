import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAllergin,
  TFilterAllergen,
} from 'src/constants/types/category/allergie';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAllergin = (params?: TPagination, filter?: TFilterAllergen) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAllergin>>
  >({
    url: `/category/adverse-reaction-cause-ref/find-page`,
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
export const useGetAllAllergin = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TAllergin>>({
    url: `/category/adverse-reaction-cause-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const allerginApi = {
  createAllergin: function (data: TAllergin) {
    return axiosClient({
      url: `/category/adverse-reaction-cause-ref/create`,
      data: data,
    });
  },
  updateAllergin: function (data: TAllergin) {
    return axiosClient({
      url: `/category/adverse-reaction-cause-ref/update`,
      data: data,
    });
  },
  deleteAllergin: function (id: string) {
    return axiosClient({
      url: `/category/adverse-reaction-cause-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default allerginApi;
