import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFileTemplate,
  TFilterFileTemplate,
} from 'src/constants/types/category/fileTemplete';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useFileTemplete = (
  params?: TPagination,
  filter?: TFilterFileTemplate,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TFileTemplate>>
  >({ url: `/category/fileTemplateRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllChapter = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TFileTemplate>>(
    {
      url: `/category/fileTemplateRef/findAll`,
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const fileTemplateApi = {
  createFileTemplate: function (data: TFileTemplate) {
    return axiosClient({
      url: `/category/fileTemplateRef/create`,
      data: data,
    });
  },
  updateFileTemplate: function (data: TFileTemplate) {
    return axiosClient({
      url: `/category/fileTemplateRef/update`,
      data: data,
    });
  },
  deleteFileTemplate: function (fileTemplateId: string) {
    return axiosClient({
      url: `/category/fileTemplateRef/deleteById`,
      params: {
        fileTemplateId,
      },
    });
  },
};

export default fileTemplateApi;
