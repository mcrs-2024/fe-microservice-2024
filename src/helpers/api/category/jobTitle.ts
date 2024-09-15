import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TJobTitle,
  TJobTitleFilter,
} from 'src/constants/types/category/jobTitle';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useJobTitle = (params?: TPagination, filter?: TJobTitleFilter) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TJobTitle>>
  >({ url: `/category/jobTitle/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllJobTitle = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TJobTitle[]>>({
    url: `/category/jobTitle/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const jobTitleApi = {
  createJobTitle: function (data: TJobTitle) {
    return axiosClient({
      url: `/category/jobTitle/create`,
      data: data,
    });
  },
  updateJobTitle: function (data: TJobTitle) {
    return axiosClient({
      url: `/category/jobTitle/update`,
      data: data,
    });
  },
  deleteJobTitle: function (id: string) {
    return axiosClient({
      url: `/category/jobTitle/delete`,
      params: {
        id,
      },
    });
  },
};

export default jobTitleApi;
