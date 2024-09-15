import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  SupplierModalType,
  TSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/supplier';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useSupplier = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<SupplierModalType>>
  >({ url: '/category/nhaCungCap/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllSupplier = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TSupplier[]>>(
    '/category/nhaCungCap/findAll',
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const supplierApi = {
  createSupplier: function (data: any) {
    return axiosClient({
      url: `/category/nhaCungCap/create`,
      data: data,
    });
  },
  updateSupplier: function (data: any) {
    return axiosClient({
      url: `/category/nhaCungCap/update`,
      data: data,
    });
  },
  deleteSupplier: function (id: string | null) {
    return axiosClient({
      url: `/category/nhaCungCap/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default supplierApi;
