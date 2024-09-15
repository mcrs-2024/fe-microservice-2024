export type TDocumentTypes = {
  id: string | null;
  documentRelatedTopicCode: string;
  documentRelatedTopicName: string;
} & TAuditInfo;
export type TDocumentTypesFields = keyof TDocumentTypes;
export type DocumentTypesModalType = 'add' | 'edit' | 'view';

export type TFilterDocumentTypes = {
  documentRelatedTopicCode: string;
  documentRelatedTopicName: string;
};
