import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterVatInfo,
  TVatInfo,
} from 'src/constants/types/his/category/vatInfo';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useVatInfo = (params?: TPagination, filter?: TFilterVatInfo) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TVatInfo>>
  >({ url: `/his/vat-info-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllVatInfo = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TVatInfo>>({
    url: ``,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const vatInfoApi = {
  createVatInfoModal: function (data: TVatInfo) {
    return axiosClient({
      url: `/his/vat-info-ref/create`,
      data: data,
    });
  },
  updateVatInfoModal: function (data: TVatInfo) {
    return axiosClient({
      url: `/his/vat-info-ref/update`,
      data: data,
    });
  },
  deleteVatInfoModal: function (id: string) {
    return axiosClient({
      url: `/his/vat-info-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default vatInfoApi;
