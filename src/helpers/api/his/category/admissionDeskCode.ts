import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAdmissionDeskCode,
  TFilterAdmissionDeskCode,
} from 'src/constants/types/his/category/admissionDeskCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useAdmissionDeskCode = (
  params?: TPagination,
  filter?: TFilterAdmissionDeskCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAdmissionDeskCode>>
  >({
    url: '/his/admission-desk-ref/find-page',
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

export const useGetAllAdmissionDeskCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAdmissionDeskCode[]>
  >({
    url: '/his/admission-desk-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const admissionDeskCodeApi = {
  createAdmissionDeskCode: function (data: TAdmissionDeskCode) {
    return axiosClient({
      url: '/his/admission-desk-ref/create',
      data: data,
    });
  },
  updateAdmissionDeskCode: function (data: TAdmissionDeskCode) {
    return axiosClient({
      url: '/his/admission-desk-ref/update',
      data: data,
    });
  },
  deleteAdmissionDeskCode: function (id: string) {
    return axiosClient({
      url: '/his/admission-desk-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default admissionDeskCodeApi;
