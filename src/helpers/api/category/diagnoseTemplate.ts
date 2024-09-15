import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TDiagnoseTemplate,
  TFilterDiagnoseTemplate,
} from 'src/constants/types/category/diagnoseTemplate';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useDiagnoseTemplate = (
  params?: TPagination,
  filter?: TFilterDiagnoseTemplate,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TDiagnoseTemplate>>
  >({ url: `/category/diagnoseTemplate/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllDiagnoseTemplate = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TDiagnoseTemplate>
  >({
    url: `/category/diagnoseTemplate/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const diagnoseTemplateApi = {
  createDiagnoseTemplate: function (data: TDiagnoseTemplate) {
    return axiosClient({
      url: `/category/diagnoseTemplate/create`,
      data: data,
    });
  },
  updateDiagnoseTemplate: function (data: TDiagnoseTemplate) {
    return axiosClient({
      url: `/category/diagnoseTemplate/update`,
      data: data,
    });
  },
  deleteDiagnoseTemplate: function (id: string) {
    return axiosClient({
      url: `/category/diagnoseTemplate/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default diagnoseTemplateApi;
