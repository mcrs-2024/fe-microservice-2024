import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterXnIndexConfiguration,
  TXnIndexConfiguration,
} from 'src/constants/types/category/xnIndexConfiguration';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useXnIndexConfiguration = (
  params?: TPagination,
  filter?: TFilterXnIndexConfiguration,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TXnIndexConfiguration>>
  >({ url: `/category/labMachineIndexRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllXnIndexConfiguration = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TXnIndexConfiguration>
  >({
    url: `/category/labMachineIndexRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const xnIndexConfigurationApi = {
  createXnIndexConfiguration: function (data: TXnIndexConfiguration) {
    return axiosClient({
      url: `/category/labMachineIndexRef/create`,
      data: data,
    });
  },
  updateXnIndexConfiguration: function (data: TXnIndexConfiguration) {
    return axiosClient({
      url: `/category/labMachineIndexRef/update`,
      data: data,
    });
  },
  deleteXnIndexConfiguration: function (labMachineIndexCode: string | null) {
    return axiosClient({
      url: `/category/labMachineIndexRef/deleteById`,
      params: {
        labMachineIndexCode,
      },
    });
  },
};

export default xnIndexConfigurationApi;
