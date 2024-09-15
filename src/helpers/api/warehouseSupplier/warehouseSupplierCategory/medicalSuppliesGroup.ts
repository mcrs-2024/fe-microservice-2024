import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  MedicalSuppliesGroupModalType,
  TMedicalSuppliesGroup,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSuppliesGroup';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useMedicalSuppliesGroup = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<MedicalSuppliesGroupModalType>>
  >({ url: '/category/nhomVatTuYTe/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllMedicalSuppliesGroup = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TMedicalSuppliesGroup[]>
  >('/category/nhomVatTuYTe/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const medicalSuppliesGroupApi = {
  createMedicalSuppliesGroup: function (data: any) {
    return axiosClient({
      url: `/category/nhomVatTuYTe/create`,
      data: data,
    });
  },
  updateMedicalSuppliesGroup: function (data: any) {
    return axiosClient({
      url: `/category/nhomVatTuYTe/update`,
      data: data,
    });
  },
  deleteMedicalSuppliesGroup: function (id: string | null) {
    return axiosClient({
      url: `/category/nhomVatTuYTe/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default medicalSuppliesGroupApi;
