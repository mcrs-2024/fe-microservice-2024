import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterPatientSubject,
  TPatientSubject,
} from 'src/constants/types/his/category/patientSubject';
import useSWR from 'swr';

import axiosClient from '../../baseApi';

export const usePatientSubject = (
  params?: TPagination,
  filter?: TFilterPatientSubject,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TPatientSubject>>
  >({ url: `/his/patient-subject/find-page`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetAllPatientSubject = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPatientSubject>
  >({
    url: `/his/patient-subject`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const patientSubjectApi = {
  createPatientSubject: function (data: TPatientSubject) {
    return axiosClient({
      url: `/his/patient-subject/create`,
      data: data,
    });
  },
  updatePatientSubject: function (data: TPatientSubject) {
    return axiosClient({
      url: `/his/patient-subject/update`,
      data: data,
    });
  },
  deletePatientSubject: function (id: string | null) {
    return axiosClient({
      url: `/his/patient-subject/delete`,
      params: {
        id,
      },
    });
  },
};

export default patientSubjectApi;
