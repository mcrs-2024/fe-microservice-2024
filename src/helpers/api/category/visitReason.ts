import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterVisitReason,
  TVisitReason,
} from 'src/constants/types/category/VisitReason';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useVisitReason = (
  params?: TPagination,
  filter?: TFilterVisitReason,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TVisitReason>>
  >({ url: `/category/visitReason/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllVisitReason = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TVisitReason>>({
    url: `/category/visitReason/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const visitReasonApi = {
  createVisitReason: function (data: TVisitReason) {
    return axiosClient({
      url: `/category/visitReason/create`,
      data: data,
    });
  },
  updateVisitReason: function (data: TVisitReason) {
    return axiosClient({
      url: `/category/visitReason/update`,
      data: data,
    });
  },
  deleteVisitReason: function (visitReasonCode: string) {
    return axiosClient({
      url: `/category/visitReason/deleteById`,
      params: {
        visitReasonCode,
      },
    });
  },
};

export default visitReasonApi;
