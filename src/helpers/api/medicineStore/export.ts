import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TExports } from 'src/constants/types/medicineStore/export';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useExportForm = (params: TPagination, filter: any) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TExports>>
  >({
    url: '/category/phieuXuatVtyt/findPage',
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

const exportFormApi = {
  createExportForm: function (data: TExports) {
    return axiosClient({
      url: '/category/phieuXuatVtyt/create',
      data: data,
    });
  },
  updateExportForm: function (data: TExports) {
    return axiosClient({
      url: `/category/phieuXuatVtyt/update`,
      data: data,
    });
  },
  deleteExportForm: function (id: string | null) {
    return axiosClient({
      url: `/category/phieuXuatVtyt/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default exportFormApi;
