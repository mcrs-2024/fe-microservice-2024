import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  BiddingDecisionModalType,
  TBiddingDecision,
} from 'src/constants/types/categoryWarehouseSupplier/biddingDecision';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useBiddingDecision = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<BiddingDecisionModalType>>
  >({ url: '/category/quyetDinhDauThau/findPage', params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllBiddingDecision = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TBiddingDecision[]>
  >('/category/quyetDinhDauThau/findAll');
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const biddingDecisionApi = {
  createBiddingDecision: function (data: any) {
    return axiosClient({
      url: `/category/quyetDinhDauThau/create`,
      data: data,
    });
  },
  updateBiddingDecision: function (data: any) {
    return axiosClient({
      url: `/category/quyetDinhDauThau/update`,
      data: data,
    });
  },
  deleteBiddingDecision: function (id: string | null) {
    return axiosClient({
      url: `/category/quyetDinhDauThau/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default biddingDecisionApi;
