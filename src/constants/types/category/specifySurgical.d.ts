type TSpecifySurgical = {
  id: string | null;
  specifySurgicalGroupCode: string;
  specifySurgicalGroupName: string;
  specifySurgicalGroupDescription: string;
  active: number | null;
} & TAuditInfo;
export type TSpecifySurgicalFields = keyof TSpecifySurgical;
export type SpecifySurgicalModalType = 'add' | 'edit' | 'view';

export type TFilterSpecifySurgical = {
  specifySurgicalGroupCode: string;
  specifySurgicalGroupName: string;
};
