import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterRegistration,
  TRegistration,
} from 'src/constants/types/category/registration';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useRegistration = (
  params?: TPagination,
  filter?: TFilterRegistration,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TRegistration>>
  >({ url: `/category/medical-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllRegistration = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TRegistration>>(
    {
      url: `/category/icdChapter/findAll`,
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const registrationApi = {
  createRegistration: function (data: TRegistration) {
    return axiosClient({
      url: `/category/medical-ref/create`,
      data: data,
    });
  },
  updateRegistration: function (data: TRegistration) {
    return axiosClient({
      url: `/category/medical-ref/update`,
      data: data,
    });
  },
  deleteRegistration: function (id: string) {
    return axiosClient({
      url: `/category/medical-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default registrationApi;
