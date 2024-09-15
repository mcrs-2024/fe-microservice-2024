import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TCountry, TCountryFilter } from 'src/constants/types/category/country';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useCountry = (params?: TPagination, filter?: TCountryFilter) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TCountry>>
  >({ url: `/category/country/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllCountry = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TCountry[]>>({
    url: `/category/country/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const countryApi = {
  createCountry: function (data: TCountry) {
    return axiosClient({
      url: `/category/country/create`,
      data: data,
    });
  },
  updateCountry: function (data: TCountry) {
    return axiosClient({
      url: `/category/country/update`,
      data: data,
    });
  },
  deleteCountry: function (id: string) {
    return axiosClient({
      url: `/category/country/delete`,
      params: {
        id,
      },
    });
  },
};

export default countryApi;
