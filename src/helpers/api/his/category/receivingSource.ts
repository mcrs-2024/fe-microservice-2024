import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterReceivingSource,
  TReceivingSource,
} from 'src/constants/types/his/category/recievingSource';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useReceivingSource = (
  params?: TPagination,
  filter?: TFilterReceivingSource,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TReceivingSource>>
  >({ url: `/his/recieving-source-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllReceivingSource = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TReceivingSource>
  >({
    url: `/his/recieving-source-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const receivingSourceApi = {
  createReceivingSourceModal: function (data: TReceivingSource) {
    return axiosClient({
      url: `/his/recieving-source-ref/create`,
      data: data,
    });
  },
  updateReceivingSourceModal: function (data: TReceivingSource) {
    return axiosClient({
      url: `/his/recieving-source-ref/update`,
      data: data,
    });
  },
  deleteReceivingSourceModal: function (id: string) {
    return axiosClient({
      url: `/his/recieving-source-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default receivingSourceApi;
