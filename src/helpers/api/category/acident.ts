import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAccident,
  TFilterAccident,
} from 'src/constants/types/category/acident';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAccident = (params?: TPagination, filter?: TFilterAccident) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAccident>>
  >({ url: `/category/casualtyRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllAcidents = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TAccident>>({
    url: `/category/casualtyRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const accidentApi = {
  createAcident: function (data: TAccident) {
    return axiosClient({
      url: `/category/casualtyRef/create`,
      data: data,
    });
  },
  updateAcident: function (data: TAccident) {
    return axiosClient({
      url: `/category/casualtyRef/update`,
      data: data,
    });
  },
  deleteAcident: function (id: string) {
    return axiosClient({
      url: `/category/casualtyRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default accidentApi;
