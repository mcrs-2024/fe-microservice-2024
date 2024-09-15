import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAppointmentReschedule,
  TFilterAppointmentReschedule,
} from 'src/constants/types/category/appointmentReschedule';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAppointmentReschedule = (
  params?: TPagination,
  filter?: TFilterAppointmentReschedule,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAppointmentReschedule>>
  >({
    url: '/category/appAppointmentRescheduleReason/findPage',
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
export const useGetAllAppointmentReschedule = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAppointmentReschedule>
  >({
    url: `/category/appAppointmentRescheduleReason/findAll`,
  });
  console.log('data', data);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const appointmentRescheduleApi = {
  createAppointmentReschedule: function (data: TAppointmentReschedule) {
    return axiosClient({
      url: `/category/appAppointmentRescheduleReason/create`,
      data: data,
    });
  },
  updateAppointmentReschedule: function (data: TAppointmentReschedule) {
    return axiosClient({
      url: `/category/appAppointmentRescheduleReason/update`,
      data: data,
    });
  },
  deleteAppointmentReschedule: function (
    appAppointmentRescheduleReasonCode: string,
  ) {
    return axiosClient({
      url: `/category/appAppointmentRescheduleReason/deleteById`,
      params: {
        appAppointmentRescheduleReasonCode,
      },
    });
  },
};

export default appointmentRescheduleApi;
