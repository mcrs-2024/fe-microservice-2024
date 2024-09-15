import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TCoupon } from 'src/constants/types/registration/phieuNhap';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useCoupon = (params: TPagination, filter: any) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TCoupon>>
  >({
    url: '/category/receipt/findPage',
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

const couponApi = {
  createCoupon: function (data: any) {
    return axiosClient({
      url: '/category/receipt/create',
      data: data,
    });
  },
  updateCoupon: function (data: any) {
    return axiosClient({
      url: `/category/receipt/update`,
      data: data,
    });
  },
  deleteCoupon: function (id: string | null) {
    return axiosClient({
      url: `/category/receipt/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default couponApi;
