import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TDocumentProtection,
  TFilterDocumentProtection,
} from 'src/constants/types/category/documentProtection';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useDocumentProtection = (
  params?: TPagination,
  filter?: TFilterDocumentProtection,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TDocumentProtection>>
  >({
    url: `/category/document-protection-level-ref/find-page`,
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
export const useGetAllDocumentProtection = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TDocumentProtection>
  >({
    url: `/category/document-protection-level-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const documentProtectionApi = {
  createDocumentProtection: function (data: TDocumentProtection) {
    return axiosClient({
      url: `/category/document-protection-level-ref/create`,
      data: data,
    });
  },
  updateDocumentProtection: function (data: TDocumentProtection) {
    return axiosClient({
      url: `/category/document-protection-level-ref/update`,
      data: data,
    });
  },
  deleteDocumentProtection: function (id: string) {
    return axiosClient({
      url: `/category/document-protection-level-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default documentProtectionApi;
