import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TChapter, TFilterChapter } from 'src/constants/types/category/chapter';
import {
  TFilterLabMachine,
  TLabMachine,
} from 'src/constants/types/category/labMachine';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useLabMachine = (
  params?: TPagination,
  filter?: TFilterLabMachine,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TLabMachine>>
  >({ url: `/category/labMachine/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllLabMachine = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TLabMachine>>({
    url: `/category/labMachine/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const labMachineApi = {
  createLabMachine: function (data: TLabMachine) {
    return axiosClient({
      url: `/category/labMachine/create`,
      data: data,
    });
  },
  updateLabMachine: function (data: TLabMachine) {
    return axiosClient({
      url: `/category/labMachine/update`,
      data: data,
    });
  },
  deleteLabMachine: function (labMachineId: string) {
    return axiosClient({
      url: `/category/labMachine/deleteById`,
      params: {
        labMachineId,
      },
    });
  },
};

export default labMachineApi;
