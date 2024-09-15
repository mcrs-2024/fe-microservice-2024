import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPaymentGroups,
  TPaymentGroups,
} from 'src/constants/types/category/paymentGroups';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePaymentGroup = (
  params?: TPagination,
  filter?: TFilterPaymentGroups,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPaymentGroups>>
  >({ url: `/category/arPaymentTypeGroup/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPaymentGroup = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaymentGroups[]>
  >({
    url: `/category/arPaymentTypeGroup/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const paymentGroupApi = {
  createPaymentGroup: function (data: TPaymentGroups) {
    return axiosClient({
      url: `/category/arPaymentTypeGroup/create`,
      data: data,
    });
  },
  updatePaymentGroup: function (data: TPaymentGroups) {
    return axiosClient({
      url: `/category/arPaymentTypeGroup/update`,
      data: data,
    });
  },
  deletePaymentGroup: function (arPaymentTypeGroupCode: string) {
    return axiosClient({
      url: `/category/arPaymentTypeGroup/deleteById`,
      params: {
        arPaymentTypeGroupCode,
      },
    });
  },
};

export default paymentGroupApi;
