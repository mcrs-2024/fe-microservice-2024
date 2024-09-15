export type TAccident = {
  id: string | null;
  casualtyCode: string | null;
  casualtyName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TAccidentFields = keyof TAccident;

export type AccidentModalType = 'add' | 'edit' | 'view';

export type TFilterAccident = {
  casualtyName: string | null;
};
