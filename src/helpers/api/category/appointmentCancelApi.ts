import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAppointmentCancel,
  TFilterAppointmentCancel,
} from 'src/constants/types/category/appointmentCancel';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAppointmentCancel = (
  params?: TPagination,
  filter?: TFilterAppointmentCancel,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAppointmentCancel>>
  >({
    url: `/category/appAppointmentCancelReason/findPage`,
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
export const useGetAllAppointmentCancel = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAppointmentCancel>
  >({
    url: `/category/appAppointmentCancelReason/findPage`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const appointmentCancelApi = {
  createAppointmentCancel: function (data: TAppointmentCancel) {
    return axiosClient({
      url: `/category/appAppointmentCancelReason/create`,
      data: data,
    });
  },
  updateAppointmentCancel: function (data: TAppointmentCancel) {
    return axiosClient({
      url: `/category/appAppointmentCancelReason/update`,
      data: data,
    });
  },
  deleteAppointmentCancel: function (appAppointmentCancelReasonCode: string) {
    return axiosClient({
      url: `/category/appAppointmentCancelReason/deleteById`,
      params: {
        appAppointmentCancelReasonCode,
      },
    });
  },
};

export default appointmentCancelApi;
