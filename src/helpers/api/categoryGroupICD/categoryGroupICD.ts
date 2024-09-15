import {
  APIResponse,
  TCategory,
  TFilterCategory,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGroupICD = (params?: TPagination, filter?: TFilterCategory) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TCategory>>
  >({ url: `/category/icd-group/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllGroupICD = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TCategory[]>>({
    url: `/category/icd-group/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const groupICDApi = {
  createGroupICD: function (data: TCategory) {
    return axiosClient({
      url: `/category/icd-group/create`,
      data: data,
    });
  },
  updateGroupICD: function (data: TCategory) {
    return axiosClient({
      url: `/category/icd-group/update`,
      data: data,
    });
  },
  deleteGroupICD: function (icdBlocksCode: string) {
    return axiosClient({
      url: `/category/icd-group/delete`,
      params: {
        icdBlocksCode,
      },
    });
  },
};

export default groupICDApi;
