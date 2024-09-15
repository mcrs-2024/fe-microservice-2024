import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TAccountType,
  TFilterAccount,
} from 'src/constants/types/category/accountType';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useAccountType = (
  params?: TPagination,
  filter?: TFilterAccount,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TAccountType>>
  >({ url: `/category/customerType/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllAccountType = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TAccountType>>({
    url: `/category/customerType/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const accountTypeApi = {
  createAccountType: function (data: TAccountType) {
    return axiosClient({
      url: `/category/customerType/create`,
      data: data,
    });
  },
  updateAccountType: function (data: TAccountType) {
    return axiosClient({
      url: `/category/customerType/update`,
      data: data,
    });
  },
  deleteAccountType: function (customerTypeCode: string) {
    return axiosClient({
      url: `/category/customerType/deleteById`,
      params: {
        customerTypeCode,
      },
    });
  },
};

export default accountTypeApi;
