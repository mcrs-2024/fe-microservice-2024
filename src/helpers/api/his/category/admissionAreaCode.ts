import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAdmissionAreaCode,
  TFilterAdmissionAreaCode,
} from 'src/constants/types/his/category/admissionAreaCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useAdmissionAreaCode = (
  params?: TPagination,
  filter?: TFilterAdmissionAreaCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAdmissionAreaCode>>
  >({
    url: '/his/admission-area-ref/find-page',
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

export const useGetAllAdmissionAreaCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAdmissionAreaCode[]>
  >({
    url: '/his/admission-area-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const admissionAreaCodeApi = {
  createAdmissionAreaCode: function (data: TAdmissionAreaCode) {
    return axiosClient({
      url: '/his/admission-area-ref/create',
      data: data,
    });
  },
  updateAdmissionAreaCode: function (data: TAdmissionAreaCode) {
    return axiosClient({
      url: '/his/admission-area-ref/update',
      data: data,
    });
  },
  deleteAdmissionAreaCode: function (id: string) {
    return axiosClient({
      url: '/his/admission-area-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default admissionAreaCodeApi;
