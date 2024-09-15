import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TDepartment,
  TFilterCatDepartment,
  TTypeDepartment,
} from 'src/constants/types/category/department';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useDepartment = (
  params?: TPagination,
  filter?: TFilterCatDepartment,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TDepartment>>
  >({
    url: '/category/department/find-page',
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

export const useGetAllDepartment = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TDepartment[]>>(
    {
      url: `/category/department`,
    },
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllTypeDepartments = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TTypeDepartment[]>
  >({
    url: `/category/department-type`,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const departmentApi = {
  createDepartment: function (data: TDepartment) {
    return axiosClient({
      url: `/category/department/create`,
      data: data,
    });
  },
  updateDepartment: function (data: TDepartment) {
    return axiosClient({
      url: `/category/department/update`,
      data: data,
    });
  },
  deleteDepartment: function (id: string) {
    return axiosClient({
      url: `/category/department/delete`,
      params: {
        id,
      },
    });
  },
};

export default departmentApi;
