import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TRelativeCodeType } from 'src/constants/types/his/category/relativeTypeCode';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const useGetAllRelativeTypeCode = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TRelativeCodeType[]>
  >({
    url: `/his/relative-type-ref`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const relativeCodeTypeApi = {
  createRelativeCode: function (data: TRelativeCodeType) {
    return axiosClient({
      url: `/his/relative-type-ref/create`,
      data: data,
    });
  },
  updateRelativeCode: function (data: TRelativeCodeType) {
    return axiosClient({
      url: `/his/relative-type-ref/update`,
      data: data,
    });
  },
  deleteRelativeCode: function (id: string) {
    return axiosClient({
      url: `/his/relative-type-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default relativeCodeTypeApi;
