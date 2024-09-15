import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAdmissionShiftCode,
  TFilterAdmissionShiftCode,
} from 'src/constants/types/his/category/admissionShiftCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useAdmissionShiftCode = (
  params?: TPagination,
  filter?: TFilterAdmissionShiftCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAdmissionShiftCode>>
  >({
    url: '/his/admission-shift-ref/find-page',
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

export const useGetAllAdmissionShiftCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TAdmissionShiftCode[]>
  >({
    url: '/his/admission-shift-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const admissionShiftCodeApi = {
  createAdmissionShiftCode: function (data: TAdmissionShiftCode) {
    return axiosClient({
      url: '/his/admission-shift-ref/create',
      data: data,
    });
  },
  updateAdmissionShiftCode: function (data: TAdmissionShiftCode) {
    return axiosClient({
      url: '/his/admission-shift-ref/update',
      data: data,
    });
  },
  deleteAdmissionShiftCode: function (id: string) {
    return axiosClient({
      url: '/his/admission-shift-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default admissionShiftCodeApi;
