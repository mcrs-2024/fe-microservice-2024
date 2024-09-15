type TTopicAssignment = {
  id: string | null;
  levelOfTopicCode: number | null;
  levelOfTopicName: string | null;
  formatTopicCode: string | null;
} & TAuditInfo;

export type TTopicAssignmentFields = keyof TTopicAssignment;

export type TopicAssignmentModalType = 'add' | 'edit' | 'view';

export type TFilterTopicAssignment = {
  levelOfTopicCode: number | null;
  levelOfTopicName: string | null;
};
