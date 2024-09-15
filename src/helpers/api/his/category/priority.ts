import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TPriority,
  TPriorityFilter,
} from 'src/constants/types/his/category/priority';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const usePriority = (params?: TPagination, filter?: TPriorityFilter) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPriority>>
  >({ url: `/his/priority-type-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPriority = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPriority>>({
    url: `/his/priority-type-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const priorityApi = {
  createPriority: function (data: TPriority) {
    return axiosClient({
      url: `/his/priority-type-ref/create`,
      data: data,
    });
  },
  updatePriority: function (data: TPriority) {
    return axiosClient({
      url: `/his/priority-type-ref/update`,
      data: data,
    });
  },
  deletePriority: function (id: string) {
    return axiosClient({
      url: `/his/priority-type-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default priorityApi;
