import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TDocumentTypes,
  TFilterDocumentTypes,
} from 'src/constants/types/category/documenTypes';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useDocumentType = (
  params?: TPagination,
  filter?: TFilterDocumentTypes,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TDocumentTypes>>
  >({
    url: `/category/documentRelatedTopicRef/findPage`,
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
export const useGetAllDocumentType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TDocumentTypes>
  >({
    url: `/category/documentRelatedTopicRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const documentTypeApi = {
  createDocumentType: function (data: TDocumentTypes) {
    return axiosClient({
      url: `/category/documentRelatedTopicRef/create`,
      data: data,
    });
  },
  updateDocumentType: function (data: TDocumentTypes) {
    return axiosClient({
      url: `/category/documentRelatedTopicRef/update`,
      data: data,
    });
  },
  deleteDocumentType: function (id: string) {
    return axiosClient({
      url: `/category/documentRelatedTopicRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default documentTypeApi;
