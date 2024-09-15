import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TMedicineTypeCategory,
  TMedicineTypeCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useMedicineTypeCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TMedicineTypeCategoryModal>>
  >({ url: '/category/loaiThuoc/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllMedicineType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicineTypeCategory[]>
  >('/category/loaiThuoc/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const medicineTypeCategoryApi = {
  createMedicineType: function (data: any) {
    return axiosClient({
      url: `/category/loaiThuoc/create`,
      data: data,
    });
  },
  updateMedicineType: function (data: any) {
    return axiosClient({
      url: `/category/loaiThuoc/update`,
      data: data,
    });
  },
  deleteMedicineType: function (id: number | null) {
    return axiosClient({
      url: `/category/loaiThuoc/deleteById`,
      params: {
        id,
      },
    });
  },
};
export default medicineTypeCategoryApi;
