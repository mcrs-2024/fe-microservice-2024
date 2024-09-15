import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TSupplierCategory,
  TSupplierCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useSupplierCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TSupplierCategoryModal>>
  >({
    url: `/category/nhaCungCapKd/findPage`,
    params,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllSupplier = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TSupplierCategory[]>
  >({ url: '/category/nhaCungCapKd/findAll' });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const supplierCategoryApi = {
  createSupplier: function (data: any) {
    return axiosClient({
      url: `/category/nhaCungCapKd/create`,
      data: data,
    });
  },
  updateSupplier: function (data: any) {
    return axiosClient({
      url: `/category/nhaCungCapKd/update`,
      data: data,
    });
  },
  deleteSupplier: function (id: number | null) {
    return axiosClient({
      url: `/category/nhaCungCapKd/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default supplierCategoryApi;
