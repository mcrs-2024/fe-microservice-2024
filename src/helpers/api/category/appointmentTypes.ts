import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAppointmentTypes,
  TFilterAppointmentTypes,
} from 'src/constants/types/category/AppointmentTypes';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAppointmentType = (
  params?: TPagination,
  filter?: TFilterAppointmentTypes,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAppointmentTypes>>
  >({ url: `/his/appAppointmentType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllAppointmentType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAppointmentTypes>
  >({
    url: `/his/appAppointmentType/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const appointmentTypeApi = {
  createAppointmentType: function (data: TAppointmentTypes) {
    return axiosClient({
      url: `/his/appAppointmentType/create`,
      data: data,
    });
  },
  updateAppointmentType: function (data: TAppointmentTypes) {
    return axiosClient({
      url: `/his/appAppointmentType/update`,
      data: data,
    });
  },
  deleteAppointmentType: function (appAppointmentTypeCode: string) {
    return axiosClient({
      url: `/his/appAppointmentType/deleteById`,
      params: {
        appAppointmentTypeCode,
      },
    });
  },
};

export default appointmentTypeApi;
