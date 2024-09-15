export type TIndicatorType = {
  id: string;
  personIndicatorCode: string; //code
  personIndicatorTypeCode: string; // mã loại
  personIndicatorName: string; //tên
  iconImage: string | null;
} & TAuditInfo;
export type TIndicatorTypeFields = keyof TIndicatorType;
export type IndicatorTypeModalType = 'add' | 'edit' | 'view';

export type TFilterIndicatorType = {
  personIndicatorTypeCode: string;
  personIndicatorName: string;
  personIndicatorCode: string;
};
