import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TEthnicity,
  TEthnicityFilter,
} from 'src/constants/types/category/ethnicity';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useEthnicity = (
  params?: TPagination,
  filter?: TEthnicityFilter,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TEthnicity>>
  >({ url: `/category/ethnicity/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllEthnicity = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TEthnicity[]>>({
    url: `/category/ethnicity/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const ethnicityApi = {
  createEthnicity: function (data: TEthnicity) {
    return axiosClient({
      url: `/category/ethnicity/create`,
      data: data,
    });
  },
  updateEthnicity: function (data: TEthnicity) {
    return axiosClient({
      url: `/category/ethnicity/update`,
      data: data,
    });
  },
  deleteEthnicity: function (id: string) {
    return axiosClient({
      url: `/category/ethnicity/delete`,
      params: {
        id,
      },
    });
  },
};

export default ethnicityApi;
