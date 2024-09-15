import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPatientTreatment,
  TPatientTreatment,
} from 'src/constants/types/category/patientTreatment';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const usePatientTreatment = (
  params?: TPagination,
  filter?: TFilterPatientTreatment,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPatientTreatment>>
  >({
    url: `/category/patient-treatment-template/find-page`,
    params,
    data: filter,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllChapter = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPatientTreatment>
  >({
    url: `/category/patient-treatment-template`,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const patientTreatmentApi = {
  createPatientTreatment: function (data: TPatientTreatment) {
    return axiosClient({
      url: `/category/patient-treatment-template/create`,
      data: data,
    });
  },
  updatePatientTreatment: function (data: TPatientTreatment) {
    return axiosClient({
      url: `/category/patient-treatment-template/update`,
      data: data,
    });
  },
  deletePatientTreatment: function (id: string) {
    return axiosClient({
      url: `/category/patient-treatment-template/delete`,
      params: {
        id,
      },
    });
  },
};

export default patientTreatmentApi;
