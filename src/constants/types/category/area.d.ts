import { TAuditInfo } from '../common';

export type TArea = {
  id: string;
  facility: string | null;
  areaNo: string | null;
  areaCode: string | null;
  areaName: string | null;
  areaNameUnUnicode: string | null;
  areaNameEnglish: string | null;
  seqNum: number | null;
};

export type TAreaFields = keyof TArea;

export type AreaModalType = 'add' | 'view' | 'edit';

export type TFilterArea = {
  areaName: string | null;
};
