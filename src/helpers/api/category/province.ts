import { TProvince } from 'src/constants/types/category/Province';

import axiosClient from '../baseApi';

const ProvinceApi = {
  // api theo tỉnh
  getProvinces: function () {
    return axiosClient({
      url: '/category/administrative/province/findAll',
    });
  },
  // api theo huyện
  getDistricts: function (provinceCode: string) {
    return axiosClient({
      url: `/category/administrative/district/${provinceCode}`,
    });
  },
  // api theo xã
  getWards: function (districCode: string) {
    return axiosClient({
      url: `/category/administrative/ward/${districCode}`,
    });
  },
};

export default ProvinceApi;
