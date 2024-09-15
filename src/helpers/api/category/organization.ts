import {
  APIResponse,
  TPagination,
  TPaginationResponse,
} from 'src/constants/types';
import { TChapter, TFilterChapter } from 'src/constants/types/category/chapter';
import useSWR from 'swr';

import axiosClient from '../baseApi';

// export const useChapter = (params?: TPagination, filter?: TFilterChapter) => {
//   const { data, error, isLoading, mutate } = useSWR<
//     APIResponse<TPaginationResponse<TChapter>>
//   >({ url: `/category/icdChapter/findPage`, params, data: filter });
//   return {
//     data,
//     error,
//     isLoading,
//     mutate,
//   };
// };
export const useGetAllOrganization = () => {
  const { data, error, isLoading, mutate } = useSWR<APIResponse<TChapter>>({
    url: `/category/organisation/find-all`,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// const chapterApi = {
//   createChapter: function (data: TChapter) {
//     return axiosClient({
//       url: `/category/icdChapter/create`,
//       data: data,
//     });
//   },
//   updateChapter: function (data: TChapter) {
//     return axiosClient({
//       url: `/category/icdChapter/update`,
//       data: data,
//     });
//   },
//   deleteChapter: function (icdChapterCode: string) {
//     return axiosClient({
//       url: `/category/icdChapter/deleteById`,
//       params: {
//         icdChapterCode,
//       },
//     });
//   },
// };

// export default chapterApi;
