import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterTreatmentPlans,
  TTreatmentPlans,
} from 'src/constants/types/category/treatmentPlans';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useTreatmentPlan = (
  params?: TPagination,
  filter?: TFilterTreatmentPlans,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TTreatmentPlans>>
  >({ url: `/category/treatmentPlansRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllTreatmentPlan = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TTreatmentPlans>
  >({
    url: `/category/treatmentPlansRef/findAll`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const treatmentPlanApi = {
  createTreatmentPlan: function (data: TTreatmentPlans) {
    return axiosClient({
      url: `/category/treatmentPlansRef/create`,
      data: data,
    });
  },
  updateTreatmentPlan: function (data: TTreatmentPlans) {
    return axiosClient({
      url: `/category/treatmentPlansRef/update`,
      data: data,
    });
  },
  deleteTreatmentPlan: function (id: string) {
    return axiosClient({
      url: `/category/treatmentPlansRef/deleteById`,
      params: {
        id,
      },
    });
  },
};

export default treatmentPlanApi;
