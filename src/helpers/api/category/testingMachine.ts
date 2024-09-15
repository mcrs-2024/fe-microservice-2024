import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterTestingMachine,
  TTestingMachine,
} from 'src/constants/types/category/testingMachine';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useTestingMachine = (
  params?: TPagination,
  filter?: TFilterTestingMachine,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TTestingMachine>>
  >({ url: `/category/labMachineTypeType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllTestingMachine = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TTestingMachine>
  >({
    url: `/category/labMachineTypeType/findPage`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const testingMachineApi = {
  createTestingMachine: function (data: TTestingMachine) {
    return axiosClient({
      url: `/category/labMachineTypeType/create`,
      data: data,
    });
  },
  updateTestingMachine: function (data: TTestingMachine) {
    return axiosClient({
      url: `/category/labMachineTypeType/update`,
      data: data,
    });
  },
  deleteTestingMachine: function (labMachineTypeCode: string) {
    return axiosClient({
      url: `/category/labMachineTypeType/deleteById`,
      params: {
        labMachineTypeCode,
      },
    });
  },
};

export default testingMachineApi;
