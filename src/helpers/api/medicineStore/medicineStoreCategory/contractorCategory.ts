import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TContractorCategoryModal } from 'src/constants/types/medicineStore/medicineCategory';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useContractorCategory = (params?: TPagination) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TContractorCategoryModal>>
  >({ url: `/category/quyetDinhDauThauKd/findPage`, params });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const contractorCategoryApi = {
  createContractor: function (data: any) {
    return axiosClient({
      url: `/category/quyetDinhDauThauKd/create`,
      data: data,
    });
  },
  updateContractor: function (data: any) {
    return axiosClient({
      url: `/category/quyetDinhDauThauKd/update`,
      data: data,
    });
  },
  deleteContractor: function (id: any) {
    return axiosClient({
      url: `/category/quyetDinhDauThauKd/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default contractorCategoryApi;
