export type TBlockICD = {
  id: string;
  icdBlocksCode: string | null;
  icdBlocksName: string | null;
  icdChapterId: string | null;
  seqNum: number | null;
};

export type TBlockICDField = keyof TBlockICD;

export type BlockICDModalType = 'add' | 'view' | 'edit';

export type TFilterBlockICD = {
  icdBlocksCode: string | null;
  icdBlocksName: string | null;
  icdChapterId: string | null;
};
