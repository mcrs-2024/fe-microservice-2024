import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterVisitTypeGroupCode,
  TVisitTypeGroupCode,
} from 'src/constants/types/category/visitTypeGroupCode';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useVisitTypeGroup = (
  params?: TPagination,
  filter?: TFilterVisitTypeGroupCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TVisitTypeGroupCode>>
  >({ url: `/category/visit-type-group-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllVisitTypeGroup = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TVisitTypeGroupCode[]>
  >({
    url: `/category/visit-type-group-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const visitTypeGroupApi = {
  createVisitTypeGroup: function (data: TVisitTypeGroupCode) {
    return axiosClient({
      url: `/category/visit-type-group-ref/create`,
      data: data,
    });
  },
  updateVisitTypeGroup: function (data: TVisitTypeGroupCode) {
    return axiosClient({
      url: `/category/visit-type-group-ref/update`,
      data: data,
    });
  },
  deleteVisitTypeGroup: function (id: string) {
    return axiosClient({
      url: `/category/visit-type-group-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default visitTypeGroupApi;
