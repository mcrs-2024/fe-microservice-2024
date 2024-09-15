import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TActiveIngredient,
  TFilterActiveIngredient,
  TGroupActiveIngredient,
} from 'src/constants/types/category/activeIngredient';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useActiveIngredient = (
  params?: TPagination,
  filter?: TFilterActiveIngredient,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TActiveIngredient>>
  >({ url: `/category/itemInteraction/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllGroupActiveIngredient = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TGroupActiveIngredient[]>
  >({
    url: `/category/interactionGroupRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const activeIngredientApi = {
  createActiveIngredient: function (data: TActiveIngredient) {
    return axiosClient({
      url: `/category/itemInteraction/create`,
      data: data,
    });
  },
  updateActiveIngredient: function (data: TActiveIngredient) {
    return axiosClient({
      url: `/category/itemInteraction/update`,
      data: data,
    });
  },
  deleteActiveIngredient: function (id: string | null) {
    return axiosClient({
      url: `/category/itemInteraction/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default activeIngredientApi;
