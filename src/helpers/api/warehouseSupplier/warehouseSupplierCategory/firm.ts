import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  FirmModalType,
  TFirm,
} from 'src/constants/types/categoryWarehouseSupplier/firm';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useFirm = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<FirmModalType>>
  >({ url: '/category/hangSanXuat/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllFirm = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TFirm[]>>(
    '/category/hangSanXuat/findAll',
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const firmApi = {
  createFirm: function (data: any) {
    return axiosClient({
      url: `/category/hangSanXuat/create`,
      data: data,
    });
  },
  updateFirm: function (data: any) {
    return axiosClient({
      url: `/category/hangSanXuat/update`,
      data: data,
    });
  },
  deleteFirm: function (id: string | null) {
    return axiosClient({
      url: `/category/hangSanXuat/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default firmApi;
