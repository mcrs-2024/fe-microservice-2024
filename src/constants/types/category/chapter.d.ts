export type TChapter = {
  id: string | null;
  icdChapterCode: string | null;
  icdChapterName: string | null;
  icdTypeId: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TChapterFields = keyof TChapter;

export type ChapterModalType = 'add' | 'edit' | 'view';

export type TFilterChapter = {
  icdChapterCode: string | null;
  icdChapterName: string | null;
};
