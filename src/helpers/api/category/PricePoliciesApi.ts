import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPricePolice,
  TPricePolice,
} from 'src/constants/types/category/pricePolicies';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePricePolicies = (
  params?: TPagination,
  filter?: TFilterPricePolice,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPricePolice>>
  >({
    url: `/category/policyPriceTypeGroupRef/findPage`,
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
export const useGetAllPricePolicies = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPricePolice>>({
    url: `/category/policyPriceTypeGroupRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const PricePoliciesApi = {
  createPricePolicies: function (data: TPricePolice) {
    return axiosClient({
      url: `/category/policyPriceTypeGroupRef/create`,
      data: data,
    });
  },
  updatePricePolicies: function (data: TPricePolice) {
    return axiosClient({
      url: `/category/policyPriceTypeGroupRef/update`,
      data: data,
    });
  },
  deletePricePolicies: function (id: string) {
    return axiosClient({
      url: `/category/policyPriceTypeGroupRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default PricePoliciesApi;
