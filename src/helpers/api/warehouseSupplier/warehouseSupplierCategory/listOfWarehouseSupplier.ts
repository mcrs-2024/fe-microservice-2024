import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  ListOfWarehouseSupplierModal,
  TListOfWarehouseSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/listOfWarehouseSuppliers';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useListOfWarehouseCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<ListOfWarehouseSupplierModal>>
  >({ url: '/category/khoVTYT/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllListOfWarehouse = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TListOfWarehouseSupplier[]>
  >('/category/khoVTYT/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const listOfWarehouseCategoryApi = {
  createListOfWarehouseCategory: function (data: any) {
    return axiosClient({
      url: `/category/khoVTYT/create`,
      data: data,
    });
  },
  updateListOfWarehouseCategory: function (data: any) {
    return axiosClient({
      url: `/category/khoVTYT/update`,
      data: data,
    });
  },
  deleteListOfWarehouseCategory: function (id: string | null) {
    return axiosClient({
      url: `/category/khoVTYT/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default listOfWarehouseCategoryApi;
