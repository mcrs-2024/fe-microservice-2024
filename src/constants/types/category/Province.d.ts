type TProvince = {
  code: string;
  codeName: string | null;
  fullName: string | null;
  fullNameEn: string | null;
  name: string | null;
  nameEn: string | null;
} & TAuditInfo;
export type TProvinceFields = keyof TProvince;

type TDistrict = {
  code: string;
  codeName: string | null;
  fullName: string | null;
  fullNameEn: string | null;
  provinceCode: string | null;
} & TAuditInfo;
export type TDistrictFields = keyof TDistrict;

type TWard = {
  code: string;
  codeName: string | null;
  fullName: string | null;
  fullNameEn: string | null;
  provinceCode: string | null;
} & TAuditInfo;
export type TWardFields = keyof TWard;
