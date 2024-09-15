import { TMenu } from 'src/constants/types/admin/menu';

import axiosClient from '../baseApi';

export const menuApi = {
  findAllByOneRoleCode: function (roleCode: string) {
    return axiosClient({
      url: `admin/menu/findAllByOneRoleCode`,
      params: {
        roleCode,
      },
    });
  },
  updateMenuByRole: function (roleCode: string, menus: TMenu[]) {
    return axiosClient({
      url: 'admin/menu/updateByOneRoleCode',
      data: {
        roleCode,
        menus,
      },
    });
  },
};
