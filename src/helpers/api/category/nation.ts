import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TNation, TNationFilter } from 'src/constants/types/category/nation';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useNation = (params?: TPagination, filter?: TNationFilter) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TNation>>
  >({ url: `/category/national/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllNation = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TNation[]>>({
    url: ``,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const nationApi = {
  createNation: function (data: TNation) {
    return axiosClient({
      url: '',
      data: data,
    });
  },
  updateNation: function (data: TNation) {
    return axiosClient({
      url: '',
      data: data,
    });
  },
  deleteNation: function (id: string) {
    return axiosClient({
      url: '',
      params: {
        id,
      },
    });
  },
};

export default nationApi;
