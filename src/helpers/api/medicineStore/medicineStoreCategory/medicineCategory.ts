import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useMedicineCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TMedicineCategory>>
  >({
    url: `/category/thuoc/findPage`,
    params,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllMedicine = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicineCategory[]>
  >({
    url: '/category/thuoc/findAll',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const medicineCategoryApi = {
  createMedicine: function (data: any) {
    return axiosClient({
      url: '/category/thuoc/create',
      data: data,
    });
  },
  updateMedicine: function (data: any) {
    return axiosClient({
      url: `/category/thuoc/update`,
      data: data,
    });
  },
  deleteMedicine: function (id: number | null) {
    return axiosClient({
      url: `/category/thuoc/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default medicineCategoryApi;
