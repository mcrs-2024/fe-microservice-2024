import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterTransferInfo,
  TTransferInfo,
} from 'src/constants/types/his/category/transferInfo';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useTransferInfo = (
  params?: TPagination,
  filter?: TFilterTransferInfo,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TTransferInfo>>
  >({ url: ``, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllTransferInfo = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TTransferInfo>>(
    {
      url: ``,
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const transferInfoApi = {
  createTransferInfoModal: function (data: TTransferInfo) {
    return axiosClient({
      url: ``,
      data: data,
    });
  },
  updateTransferInfoModal: function (data: TTransferInfo) {
    return axiosClient({
      url: ``,
      data: data,
    });
  },
  deleteTransferInfoModal: function (id: string) {
    return axiosClient({
      url: ``,
      params: {
        id,
      },
    });
  },
};

export default transferInfoApi;
