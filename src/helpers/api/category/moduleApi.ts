import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TCategoryModule,
  TFilterCategoryModule,
} from 'src/constants/types/category/module';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useModule = (
  params?: TPagination,
  filter?: TFilterCategoryModule,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TCategoryModule>>
  >({ url: `/category/systemModule/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllModule = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TCategoryModule>
  >({
    url: `/category/systemModule/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const moduleApi = {
  createModule: function (data: TCategoryModule) {
    return axiosClient({
      url: `/category/systemModule/create`,
      data: data,
    });
  },
  updateModule: function (data: TCategoryModule) {
    return axiosClient({
      url: `/category/systemModule/update`,
      data: data,
    });
  },
  deleteModule: function (moduleId: string) {
    return axiosClient({
      url: `/category/systemModule/deleteById`,
      params: {
        moduleId,
      },
    });
  },
};

export default moduleApi;
