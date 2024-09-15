import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  MedicalSuppliesModalType,
  TMedicalSupplies,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSupplies';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useMedicalSupplies = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<MedicalSuppliesModalType>>
  >({ url: '/category/vatTuYTe/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllMedicalSupplies = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicalSupplies[]>
  >('/category/vatTuYTe/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const medicalSuppliesApi = {
  createMedicalSupplies: function (data: any) {
    return axiosClient({
      url: `/category/vatTuYTe/create`,
      data: data,
    });
  },
  updateMedicalSupplies: function (data: any) {
    return axiosClient({
      url: `/category/vatTuYTe/update`,
      data: data,
    });
  },
  deleteMedicalSupplies: function (id: string | null) {
    return axiosClient({
      url: `/category/vatTuYTe/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default medicalSuppliesApi;
