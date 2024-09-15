import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  THoatChatCategory,
  THoatChatCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useHoatChatCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<THoatChatCategoryModal>>
  >({ url: '/category/hoatChat/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllHoatChat = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<THoatChatCategory[]>
  >('/category/hoatChat/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const hoatChatCategoryApi = {
  createHoatChat: function (data: any) {
    return axiosClient({
      url: `/category/hoatChat/create`,
      data: data,
    });
  },
  updateHoatChat: function (data: any) {
    return axiosClient({
      url: `/category/hoatChat/update`,
      data: data,
    });
  },
  deleteHoatChat: function (id: number | null) {
    return axiosClient({
      url: `/category/hoatChat/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default hoatChatCategoryApi;
