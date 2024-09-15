import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFacility,
  TFilterFacility,
} from 'src/constants/types/category/facilities';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useFacilities = (
  params?: TPagination,
  filter?: TFilterFacility,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TFacility>>
  >({ url: `/category/facility/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllFacilities = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TFacility[]>>({
    url: `/category/facility`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const facilitiesApi = {
  createFacilities: function (data: TFacility) {
    return axiosClient({
      url: `/category/facility/create`,
      data: data,
    });
  },
  updateFacilities: function (data: TFacility) {
    return axiosClient({
      url: `/category/facility/update`,
      data: data,
    });
  },
  deleteFacilities: function (id: string) {
    return axiosClient({
      url: `/category/facility/delete`,
      params: {
        id,
      },
    });
  },
};

export default facilitiesApi;
