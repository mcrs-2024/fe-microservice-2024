import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterGuarantee,
  TGuarantee,
  TPatient,
  TPersonIndicatorSub,
  TVisitType,
} from 'src/constants/types/category/guarantees';
import { TIndicatorType } from 'src/constants/types/category/indicatorType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGuarantee = (
  params?: TPagination,
  filter?: TFilterGuarantee,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TGuarantee>>
  >({ url: `/category/guarantee/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPersonIndicator = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TIndicatorType[]>
  >({
    url: `/category/person-indicator-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPersonIndicatorSub = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPersonIndicatorSub[]>
  >({
    url: `/category/person-indicator-sub-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPatient = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TPatient[]>>({
    url: `/category/patient-pricing-class-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllVisitType = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TVisitType[]>>({
    url: `/category/visit-type-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllGuarantee = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TGuarantee>>({
    url: `/category/guarantee`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const guaranteeApi = {
  createGuarantee: function (data: TGuarantee) {
    return axiosClient({
      url: `/category/guarantee/create`,
      data: data,
    });
  },
  updateGuarantee: function (data: TGuarantee) {
    return axiosClient({
      url: `/category/guarantee/update`,
      data: data,
    });
  },
  deleteGuarantee: function (id: string) {
    return axiosClient({
      url: `/category/guarantee/delete`,
      params: {
        id,
      },
    });
  },
};

export default guaranteeApi;
