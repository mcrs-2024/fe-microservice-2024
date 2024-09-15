import { error } from 'console';
import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  ProvisionalFilter,
  TProvisional,
} from 'src/constants/types/medicineStore/phieuDuTru';
import useSWR, { mutate } from 'swr';

import axiosClient from '../baseApi';

export const useProvisional = (
  params?: TPagination,
  filter?: ProvisionalFilter,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TProvisional>>
  >({
    url: '/category/phieu-du-tru/findPage',
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

const provisionalApi = {
  createProvisional: function (data: any) {
    return axiosClient({
      url: '/category/phieu-du-tru/create',
      data: data,
    });
  },
  updateProvisional: function (data: any) {
    return axiosClient({
      url: `/category/phieu-du-tru/update`,
      data: data,
    });
  },
  deleteProvisional: function (id: string | null) {
    return axiosClient({
      url: `/category/phieu-du-tru/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default provisionalApi;
