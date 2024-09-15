import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterVehicles,
  TVehicles,
} from 'src/constants/types/category/vehicles';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useVehicle = (params?: TPagination, filter?: TFilterVehicles) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TVehicles>>
  >({ url: `/category/car/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllDepartment = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TVehicles>>({
    url: `/category/department`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const vehicleApi = {
  createVehicle: function (data: TVehicles) {
    return axiosClient({
      url: `/category/car/create`,
      data: data,
    });
  },
  updateVehicle: function (data: TVehicles) {
    return axiosClient({
      url: `/category/car/update`,
      data: data,
    });
  },
  deleteVehicle: function (id: string) {
    return axiosClient({
      url: `/category/car/delete`,
      params: {
        id,
      },
    });
  },
};

export default vehicleApi;
