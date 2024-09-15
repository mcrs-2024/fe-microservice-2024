type TPersonIndicator = {
  personIndicatorTypeCode: string;
  personIndicatorTypeRefName: string;
} & TAuditInfo;
export type TPersonIndicatorFields = keyof TPersonIndicator;
export type PersonIndicatorModalType = 'add' | 'edit' | 'view';

export type TFilterPersonIndicator = {
  personIndicatorTypeCode: string;
  personIndicatorTypeRefName: string;
};
