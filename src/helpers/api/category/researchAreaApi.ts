import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterResearchArea,
  TResearchArea,
} from 'src/constants/types/category/researchArea';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useResearchArea = (
  params?: TPagination,
  filter?: TFilterResearchArea,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TResearchArea>>
  >({ url: `/category/research-area-ref/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllResearchArea = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TResearchArea>>(
    {
      url: `/category/research-area-ref`,
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const researchAreaApi = {
  createResearchArea: function (data: TResearchArea) {
    return axiosClient({
      url: `/category/research-area-ref/create`,
      data: data,
    });
  },
  updateResearchArea: function (data: TResearchArea) {
    return axiosClient({
      url: `/category/research-area-ref/update`,
      data: data,
    });
  },
  deleteResearchArea: function (id: string) {
    return axiosClient({
      url: `/category/research-area-ref/delete`,
      params: {
        id,
      },
    });
  },
};

export default researchAreaApi;
