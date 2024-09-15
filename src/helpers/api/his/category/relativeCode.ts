import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterRelativeCode,
  TRelativeCode,
} from 'src/constants/types/his/category/relativeCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useRelativeCode = (
  params?: TPagination,
  filter?: TFilterRelativeCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TRelativeCode>>
  >({ url: `/his/relative-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllRelativeCode = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TRelativeCode>>(
    {
      url: `/his/relative-ref/find-all`,
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const relativeCodeApi = {
  createRelativeCode: function (data: TRelativeCode) {
    return axiosClient({
      url: `/his/relative-ref/create`,
      data: data,
    });
  },
  updateRelativeCode: function (data: TRelativeCode) {
    return axiosClient({
      url: `/his/relative-ref/update`,
      data: data,
    });
  },
  deleteRelativeCode: function (id: string) {
    return axiosClient({
      url: `/his/relative-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default relativeCodeApi;
