type TBiddingDecision = {
  id: string | null;
  note: string | null;
  soThau: string | null;
  tenVatTu: string | null;
  tenDonVi: string | null;
  ngayCongBo: string | null;
  quyetDinh: string | null;
};

export type TBiddingDecisionFields = keyof TBiddingDecision;

export type BiddingDecisionModalType = 'view' | 'add' | 'edit';
