import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterMedicine,
  TWarehouseMedicine,
} from 'src/constants/types/medicineStore/warehouseMedicine';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useWarehouseMedicine = (
  params?: TPagination,
  filter?: TFilterMedicine,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TWarehouseMedicine>>
  >({
    url: '/category/medicineStore/findPage',
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

const warehouseApi = {
  createWarehouse: function (data: any) {
    return axiosClient({
      url: '/category/medicineStore/create',
      data: data,
    });
  },
  updateWarehouse: function (data: any) {
    return axiosClient({
      url: '/category/medicineStore/update',
      data: data,
    });
  },
  deleteWarehouse: function (khoId: string | null) {
    return axiosClient({
      url: '/category/medicineStore/deleteById',
      params: {
        khoId,
      },
    });
  },
};

export default warehouseApi;
