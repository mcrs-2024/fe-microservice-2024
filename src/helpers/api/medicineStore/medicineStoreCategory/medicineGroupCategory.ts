import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TMedicineGroupCategory,
  TMedicineGroupCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useMedicineGroupCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TMedicineGroupCategoryModal>>
  >({
    url: `/category/nhomThuoc/findPage`,
    params,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllMedicineGroup = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicineGroupCategory[]>
  >('/category/nhomThuoc/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
const medicineGroupApi = {
  createMedicineGroup: function (data: any) {
    return axiosClient({
      url: `/category/nhomThuoc/create`,
      data: data,
    });
  },
  updateMedicineGroup: function (data: any) {
    return axiosClient({
      url: `/category/nhomThuoc/update`,
      data: data,
    });
  },
  deleteMedicineGroup: function (id: number | null) {
    return axiosClient({
      url: `/category/nhomThuoc/deleteById`,
      params: {
        id,
      },
    });
  },
};
export default medicineGroupApi;
