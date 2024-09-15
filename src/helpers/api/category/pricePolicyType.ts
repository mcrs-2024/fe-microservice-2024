import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPricePolicyType,
  TPricePolicyType,
} from 'src/constants/types/category/pricePolicyType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePolicyPriceType = (
  params?: TPagination,
  filter?: TFilterPricePolicyType,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPricePolicyType>>
  >({ url: `/category/policyPriceTypeRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPolicyPriceType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPricePolicyType>
  >({
    url: `/category/policyPriceTypeRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const policyPriceTypeApi = {
  createPolicyPriceType: function (data: TPricePolicyType) {
    return axiosClient({
      url: `/category/policyPriceTypeRef/create`,
      data: data,
    });
  },
  updatePolicyPriceType: function (data: TPricePolicyType) {
    return axiosClient({
      url: `/category/policyPriceTypeRef/update`,
      data: data,
    });
  },
  deletePolicyPriceType: function (id: string) {
    return axiosClient({
      url: `/category/policyPriceTypeRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default policyPriceTypeApi;
