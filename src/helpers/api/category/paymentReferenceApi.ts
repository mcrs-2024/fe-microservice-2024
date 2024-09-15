import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPaymentReference,
  TPaymentReference,
} from 'src/constants/types/category/paymentReference';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePaymentReference = (
  params?: TPagination,
  filter?: TFilterPaymentReference,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPaymentReference>>
  >({ url: `/category/arPaymentSubType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllPaymentReference = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaymentReference>
  >({
    url: `/category/arPaymentSubType/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const paymentReferenceApi = {
  createPaymentReference: function (data: TPaymentReference) {
    return axiosClient({
      url: `/category/arPaymentSubType/create`,
      data: data,
    });
  },
  updatePaymentReference: function (data: TPaymentReference) {
    return axiosClient({
      url: `/category/arPaymentSubType/update`,
      data: data,
    });
  },
  deletePaymentReference: function (arPaymentSubTypeCode: string) {
    return axiosClient({
      url: `/category/arPaymentSubType/deleteById`,
      params: {
        arPaymentSubTypeCode,
      },
    });
  },
};

export default paymentReferenceApi;
