import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TExportForm,
  TFilterExportForm,
} from 'src/constants/types/categoryWarehouseSupplier/exportForm';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useCouponForm = (
  params?: TPagination,
  filter?: TFilterExportForm,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TExportForm>>
  >({ url: `/category/phieuXuatVtyt/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllCouponForm = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TExportForm>>({
    url: `/category/phieuXuatVtyt/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const couponFormApi = {
  createCouponForm: function (data: TExportForm) {
    return axiosClient({
      url: `/category/phieuXuatVtyt/create`,
      data: data,
    });
  },
  updateCouponForm: function (data: TExportForm) {
    return axiosClient({
      url: `/category/phieuXuatVtyt/update`,
      data: data,
    });
  },
  deleteCouponForm: function (id: string | null) {
    return axiosClient({
      url: `/category/phieuXuatVtyt/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default couponFormApi;
