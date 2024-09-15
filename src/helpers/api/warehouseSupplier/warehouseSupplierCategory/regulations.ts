import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  RegulationModalType,
  TRegulation,
} from 'src/constants/types/categoryWarehouseSupplier/regulations';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useRegulation = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<RegulationModalType>>
  >({ url: '/category/quyCach/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllRegulation = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TRegulation[]>>(
    '/category/quyCach/findAll',
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const regulationApi = {
  createRegulation: function (data: any) {
    return axiosClient({
      url: `/category/quyCach/create`,
      data: data,
    });
  },
  updateRegulation: function (data: any) {
    return axiosClient({
      url: `/category/quyCach/update`,
      data: data,
    });
  },
  deleteRegulation: function (id: string | null) {
    return axiosClient({
      url: `/category/quyCach/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default regulationApi;
