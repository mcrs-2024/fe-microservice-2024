export type TDepartment = {
  id: string;
  facility: string | null;
  departmentNo: number | null;
  departmentType: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  departmentNameUnUnicode: string | null;
  departmentNameEnglish: string | null;
  isSurgery: boolean | null;
  isActive: boolean | null;
  seqNum: number | null;
};

export type TTypeDepartment = {
  id: string | null;
  departmentTypeCode: string | null;
  departmentTypeName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TCatDepartmentFields = keyof TCatDepartment;

export type CatDepartmentModalType = 'add' | 'edit' | 'view';

export type TFilterCatDepartment = {
  departmentName: string | null;
  departmentCode: string | null;
};
