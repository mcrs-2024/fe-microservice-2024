import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterInventory,
  TInventorySheet,
} from 'src/constants/types/medicineStore/inventorySheet';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useInventory = (
  params?: TPagination,
  filter?: TFilterInventory,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TInventorySheet>>
  >({
    url: `/category/phieu-kiem-ke/findPage`,
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

const inventoryApi = {
  createInventory: function (data: any) {
    return axiosClient({
      url: '/category/phieu-kiem-ke/create',
      data: data,
    });
  },
  updateInventory: function (data: any) {
    return axiosClient({
      url: '/category/phieu-kiem-ke/update',
      data: data,
    });
  },
  deleteInventory: function (khoId: string | null) {
    return axiosClient({
      url: `/category/phieu-kiem-ke/deleteById`,
      params: {
        khoId,
      },
    });
  },
};

export default inventoryApi;
