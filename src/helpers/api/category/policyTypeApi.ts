import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPolicyType,
  TPolicyType,
} from 'src/constants/types/category/policyTypes';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePolicyType = (
  params?: TPagination,
  filter?: TFilterPolicyType,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPolicyType>>
  >({ url: `/category/policyTypeRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPolicyType = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPolicyType>>({
    url: `/category/policyTypeRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const policyTypeApi = {
  createPolicyType: function (data: TPolicyType) {
    return axiosClient({
      url: `/category/policyTypeRef/create`,
      data: data,
    });
  },
  updatePolicyType: function (data: TPolicyType) {
    return axiosClient({
      url: `/category/policyTypeRef/update`,
      data: data,
    });
  },
  deletePolicyType: function (policyTypeId: string) {
    return axiosClient({
      url: `/category/policyTypeRef/deleteById`,
      params: {
        policyTypeId,
      },
    });
  },
};

export default policyTypeApi;
