import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TCouponForm,
  TFilterCouponForm,
} from 'src/constants/types/categoryWarehouseSupplier/couponForm';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useCouponForm = (
  params?: TPagination,
  filter?: TFilterCouponForm,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TCouponForm>>
  >({ url: `/category/phieuNhapVtyt/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllCouponForm = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TCouponForm>>({
    url: `/category/phieuNhapVtyt/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const couponFormApi = {
  createCouponForm: function (data: TCouponForm) {
    return axiosClient({
      url: `/category/phieuNhapVtyt/create`,
      data: data,
    });
  },
  updateCouponForm: function (data: TCouponForm) {
    return axiosClient({
      url: `/category/phieuNhapVtyt/update`,
      data: data,
    });
  },
  deleteCouponForm: function (id: string | null) {
    return axiosClient({
      url: `/category/phieuNhapVtyt/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default couponFormApi;
