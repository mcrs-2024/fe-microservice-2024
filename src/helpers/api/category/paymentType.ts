import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TCurrency } from 'src/constants/types/category/currency';
import { TPaymentGroups } from 'src/constants/types/category/paymentGroups';
import {
  TFilterPaymentType,
  TPaymentType,
} from 'src/constants/types/category/paymentType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePaymentType = (
  params?: TPagination,
  filter?: TFilterPaymentType,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPaymentType>>
  >({ url: `/category/ar-payment-type-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllCurrency = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TCurrency[]>>({
    url: `/category/currency-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllGroupPayment = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaymentGroups[]>
  >({ url: '/category/arPaymentTypeGroup/findAll' });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPaymentType = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPaymentType>>({
    url: `/category/ar-payment-type-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const paymentApi = {
  createPaymentType: function (data: TPaymentType) {
    return axiosClient({
      url: `/category/ar-payment-type-ref/create`,
      data: data,
    });
  },
  updatePaymentType: function (data: TPaymentType) {
    return axiosClient({
      url: `/category/ar-payment-type-ref/update`,
      data: data,
    });
  },
  deletePaymentType: function (id: string) {
    return axiosClient({
      url: `/category/ar-payment-type-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default paymentApi;
