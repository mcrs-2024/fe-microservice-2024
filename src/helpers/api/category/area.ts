import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TArea, TFilterArea } from 'src/constants/types/category/area';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useArea = (params?: TPagination, filter?: TFilterArea) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TArea>>
  >({
    url: '/category/area-ref/find-page',
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

export const useGetAllArea = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TArea[]>>({
    url: '/category/area-ref',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const areaAPI = {
  createArea: function (data: TArea) {
    return axiosClient({
      url: '/category/area-ref/create',
      data: data,
    });
  },
  updateArea: function (data: TArea) {
    return axiosClient({
      url: '/category/area-ref/update',
      data: data,
    });
  },
  deleteArea: function (id: string) {
    return axiosClient({
      url: '/category/area-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default areaAPI;
