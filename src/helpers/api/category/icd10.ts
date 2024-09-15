import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TFilterIcd10, TIcd10 } from 'src/constants/types/category/ICD10';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useIcd10 = (params?: TPagination, filter?: TFilterIcd10) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TIcd10>>
  >({ url: `/category/icd10/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllChapter = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TIcd10>>({
    url: `/category/icd10/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const icd10Api = {
  createIcd10: function (data: TIcd10) {
    return axiosClient({
      url: `/category/icd10/create`,
      data: data,
    });
  },
  updateIcd10: function (data: TIcd10) {
    return axiosClient({
      url: `/category/icd10/update`,
      data: data,
    });
  },
  deleteIcd10: function (id: string | null) {
    return axiosClient({
      url: `/category/icd10/delete`,
      params: {
        id,
      },
    });
  },
};

export default icd10Api;
