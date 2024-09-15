import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAppointmentMethod,
  TFilterAppointmentMethod,
} from 'src/constants/types/category/appointmentMethod';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAppointmentMethod = (
  params?: TPagination,
  filter?: TFilterAppointmentMethod,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAppointmentMethod>>
  >({
    url: `/category/app-appointment-method-ref/find-page`,
    params,
    data: filter,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllAppointmentMethod = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAppointmentMethod>
  >({
    url: `/category/app-appointment-method-ref/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const appointmentMethodApi = {
  createAppointmentMethod: function (data: TAppointmentMethod) {
    return axiosClient({
      url: `/category/app-appointment-method-ref/create`,
      data: data,
    });
  },
  updateAppointmentMethod: function (data: TAppointmentMethod) {
    return axiosClient({
      url: `/category/app-appointment-method-ref/update`,
      data: data,
    });
  },
  deleteAppointmentMethod: function (id: string) {
    return axiosClient({
      url: `/category/app-appointment-method-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default appointmentMethodApi;
