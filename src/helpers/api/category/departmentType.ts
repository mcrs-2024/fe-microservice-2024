import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TTypeDepartment } from 'src/constants/types/category/department';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useGetAllDepartmentType = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TTypeDepartment>
  >({
    url: `/category/department-type`,
  });
  console.log('data', data);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const departmentTypeApi = {
  createDepartmentType: function (data: TTypeDepartment) {
    return axiosClient({
      url: `/category/department-type/create`,
      data: data,
    });
  },
  updateDepartmentType: function (data: TTypeDepartment) {
    return axiosClient({
      url: `/category/department-type/update`,
      data: data,
    });
  },
  deleteDepartmentType: function (id: string) {
    return axiosClient({
      url: `/category/department-type/delete`,
      params: {
        id,
      },
    });
  },
};

export default departmentTypeApi;
