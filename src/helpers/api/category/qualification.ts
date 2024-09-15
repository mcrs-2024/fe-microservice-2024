import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterQualification,
  TQualification,
} from 'src/constants/types/category/qualification';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useQualification = (
  params?: TPagination,
  filter?: TFilterQualification,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TQualification>>
  >({ url: `/category/qualificationType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllQualification = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TQualification>
  >({
    url: `/category/qualificationType/findPage`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const qualificationApi = {
  createQualification: function (data: TQualification) {
    return axiosClient({
      url: `/category/qualificationType/create`,
      data: data,
    });
  },
  updateQualification: function (data: TQualification) {
    return axiosClient({
      url: `/category/qualificationType/update`,
      data: data,
    });
  },
  deleteQualification: function (qualificationTypeCode: string) {
    return axiosClient({
      url: `/category/qualificationType/deleteById`,
      params: {
        qualificationTypeCode,
      },
    });
  },
};

export default qualificationApi;
