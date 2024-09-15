import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TChapter, TFilterChapter } from 'src/constants/types/category/chapter';
import { TFilterSpecifyPolicy } from 'src/constants/types/category/specifyPolicy';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useSpecifyPolicy = (
  params?: TPagination,
  filter?: TFilterSpecifyPolicy,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TChapter>>
  >({ url: `/category/specifyPolicyGroup/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllSpecifyPolicy = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TChapter>>({
    url: `/category/specifyPolicyGroup/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const specifyPolicyApi = {
  createSpecifyPolicy: function (data: TChapter) {
    return axiosClient({
      url: `/category/specifyPolicyGroup/create`,
      data: data,
    });
  },
  updateSpecifyPolicy: function (data: TChapter) {
    return axiosClient({
      url: `/category/specifyPolicyGroup/update`,
      data: data,
    });
  },
  deleteSpecifyPolicy: function (specifyPolicyGroupCode: string) {
    return axiosClient({
      url: `/category/specifyPolicyGroup/deleteById`,
      params: {
        specifyPolicyGroupCode,
      },
    });
  },
};

export default specifyPolicyApi;
