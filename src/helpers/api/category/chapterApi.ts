import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TChapter, TFilterChapter } from 'src/constants/types/category/chapter';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useChapter = (params?: TPagination, filter?: TFilterChapter) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TChapter>>
  >({ url: `/category/icd-chapter-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllChapter = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TChapter>>({
    url: `/category/icd-chapter-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const chapterApi = {
  createChapter: function (data: TChapter) {
    return axiosClient({
      url: `/category/icd-chapter-ref/create`,
      data: data,
    });
  },
  updateChapter: function (data: TChapter) {
    return axiosClient({
      url: `/category/icd-chapter-ref/update`,
      data: data,
    });
  },
  deleteChapter: function (id: string) {
    return axiosClient({
      url: `/category/icd-chapter-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default chapterApi;
