import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterInsuranceDetailCode,
  TInsuranceDetailCode,
} from 'src/constants/types/his/category/insuranceDetailCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useInsuranceDetailCode = (
  params?: TPagination,
  filter?: TFilterInsuranceDetailCode,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TInsuranceDetailCode>>
  >({
    url: '/his/insurance-entity-detail-ref/find-page',
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

export const useGetAllInsuranceDetailCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TInsuranceDetailCode[]>
  >({
    url: '/his/insurance-entity-detail-ref/find-all',
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const insuranceDetailCodeApi = {
  createInsuranceDetailCode: function (data: TInsuranceDetailCode) {
    return axiosClient({
      url: '/his/insurance-entity-detail-ref/create',
      data: data,
    });
  },
  updateInsuranceDetailCode: function (data: TInsuranceDetailCode) {
    return axiosClient({
      url: '/his/insurance-entity-detail-ref/update',
      data: data,
    });
  },
  deleteInsuranceDetailCode: function (id: string) {
    return axiosClient({
      url: '/his/insurance-entity-detail-ref/delete',
      params: {
        id,
      },
    });
  },
};

export default insuranceDetailCodeApi;
