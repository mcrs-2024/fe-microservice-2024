export type TPriority = {
  id: string | null;
  priorityTypeCode: string | null;
  priorityTypeName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TPriorityFields = keyof TPriority;

export type PriorityModalType = 'add' | 'edit' | 'view';

export type TPriorityFilter = {
  priorityTypeCode: string | null;
  priorityTypeName: string | null;
};
