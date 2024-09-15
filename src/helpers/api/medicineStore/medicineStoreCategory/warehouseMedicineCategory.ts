import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TMeasureMedicine } from 'src/constants/types/medicineStore/MeasureMedicine';
import {
  TFilterWarehouseMedicineCategory,
  THoatChatCategory,
  TMedicineGroupCategory,
  TMedicineTypeCategory,
  TWarehouseMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useWarehouseMedicineCategory = (
  params: TPagination,
  filter: TFilterWarehouseMedicineCategory,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TWarehouseMedicineCategory>>
  >({
    url: '/category/khoDuoc/findPage',
    data: filter,
    params,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllGroupMedicine = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicineGroupCategory[]>
  >({ url: '/category/nhomThuoc/findAll' });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllTypeMedicine = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicineTypeCategory[]>
  >({ url: '/category/loaiThuoc/findAll' });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllHoatChat = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<THoatChatCategory[]>
  >({ url: '/category/hoatChat/findAll' });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllWarehouseMedicineCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TWarehouseMedicineCategory[]>
  >({
    url: '/category/khoDuoc/findAll',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
const warehouseMedicineCategoryApi = {
  createWarehouseMedicine: function (data: any) {
    return axiosClient({
      url: '/category/khoDuoc/create',
      data: data,
    });
  },
  updateWarehouseMedicine: function (data: any) {
    return axiosClient({
      url: `/category/khoDuoc/update`,
      data: data,
    });
  },
  deleteWarehouseMedicine: function (id: string | null) {
    return axiosClient({
      url: `/category/khoDuoc/deleteById`,
      params: {
        id,
      },
    });
  },
};

export const useMeasure = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMeasureMedicine[]>
  >('/category/uom-ref/find-all');
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default warehouseMedicineCategoryApi;
