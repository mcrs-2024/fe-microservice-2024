import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TDebt, TFilterDebt } from 'src/constants/types/category/Debt';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useDebt = (params?: TPagination, filter?: TFilterDebt) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TDebt>>
  >({
    url: '/category/policyThirdParty/findPage',
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
export const useGetAllAppointmentReschedule = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TDebt>>({
    url: `/category/policyThirdParty/findAll`,
  });
  console.log('data', data);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const debtApi = {
  createDebt: function (data: TDebt) {
    return axiosClient({
      url: `/category/policyThirdParty/create`,
      data: data,
    });
  },
  updateDebt: function (data: TDebt) {
    return axiosClient({
      url: `/category/policyThirdParty/update`,
      data: data,
    });
  },
  deleteDebt: function (appDebtReasonCode: string) {
    return axiosClient({
      url: `/category/policyThirdParty/deleteById`,
      params: {
        appDebtReasonCode,
      },
    });
  },
};

export default debtApi;
