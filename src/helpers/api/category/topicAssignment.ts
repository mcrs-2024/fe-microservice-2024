import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import {
  TFilterTopicAssignment,
  TTopicAssignment,
} from 'src/constants/types/category/topicAssignments';
import useSWR from 'swr';

import axiosClient from '../baseApi';

export const useTopicAssignment = (
  params?: TPagination,
  filter?: TFilterTopicAssignment,
) => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TPaginationResponse<TTopicAssignment>>
  >({ url: `/category/levelOfTopicRef/findPage`, params, data: filter });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export const useGetAllTopicAssignment = () => {
  const { data, error, isLoading, mutate } = useSWR<
    APIResponse<TTopicAssignment>
  >({
    url: `/category/levelOfTopicRef/findPage`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const topicAssignmentApi = {
  createTopicAssignment: function (data: TTopicAssignment) {
    return axiosClient({
      url: `/category/levelOfTopicRef/create`,
      data: data,
    });
  },
  updateTopicAssignment: function (data: TTopicAssignment) {
    return axiosClient({
      url: `/category/levelOfTopicRef/update`,
      data: data,
    });
  },
  deleteTopicAssignment: function (levelOfTopicCode: number) {
    return axiosClient({
      url: `/category/levelOfTopicRef/deleteById`,
      params: {
        levelOfTopicCode,
      },
    });
  },
};

export default topicAssignmentApi;
