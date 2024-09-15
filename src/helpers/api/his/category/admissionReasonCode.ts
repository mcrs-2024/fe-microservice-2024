import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAdmissionReasonCode,
  TFilterAdmissionReasonCode,
} from 'src/constants/types/his/category/admissionReasonCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useAdmissionReasonCode = (
  params?: TPagination,
  filter?: TFilterAdmissionReasonCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAdmissionReasonCode>>
  >({
    url: '/his/admission-reason-ref/find-page',
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

export const useGetAllAdmissionReasonCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAdmissionReasonCode[]>
  >({
    url: '/his/admission-reason-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const admissionReasonCodeApi = {
  createAdmissionReasonCode: function (data: TAdmissionReasonCode) {
    return axiosClient({
      url: '/his/admission-reason-ref/create',
      data: data,
    });
  },
  updateAdmissionReasonCode: function (data: TAdmissionReasonCode) {
    return axiosClient({
      url: '/his/admission-reason-ref/update',
      data: data,
    });
  },
  deleteAdmissionReasonCode: function (id: string) {
    return axiosClient({
      url: '/his/admission-reason-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default admissionReasonCodeApi;
