import { url } from 'inspector';
import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TBlockICD,
  TFilterBlockICD,
} from 'src/constants/types/category/blockICD';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useBlockICD = (params?: TPagination, filter?: TFilterBlockICD) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TBlockICD>>
  >({
    url: '/category/icd-blocks-ref/find-page',
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

export const useGetAllBlockIDC = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TBlockICD[]>>({
    url: '/category/icd-blocks-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const BlockICDApi = {
  createBlockICD: function (data: TBlockICD) {
    return axiosClient({
      url: '/category/icd-blocks-ref/create',
      data,
    });
  },
  updateBlockICD: function (data: TBlockICD) {
    return axiosClient({
      url: '/category/icd-blocks-ref/update',
      data,
    });
  },
  deleteBlockICD: function (id: string | null) {
    return axiosClient({
      url: '/category/icd-blocks-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default BlockICDApi;
