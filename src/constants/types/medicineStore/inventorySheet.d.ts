import { TAuditInfo } from '../common';

type TInventorySheet = {
  id: string | null;
  description: string | null;
  khoId: number | null;
  maPhieu: string | null;
  nguoiKiemKe: string | null;
  nguonThuoc: string | null;
  nguonThuocId: string | null;
  tieuDe: string | null;
  tongGiaTri: number | null;
  tinhTrang: string | null;
  tenKho: string | null;
  //ngayKiemKe: string | null;
} & TAuditInfo;
export { TInventorySheet };

export type TInventoryFields = keyof TInventorySheet;

export type InventoryModelType = 'add' | 'edit' | 'view';

export type TFilterInventory = {
  maPhieu: string | null;
  tieuDe: string | null;
  tenKho: string | null;
  nguonThuoc: string | null;
  tinhTrang: string | null;
  createDate: string | null;
  modifyDate: string | null;
};
