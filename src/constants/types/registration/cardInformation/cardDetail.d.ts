export type TMedicalCard = {
  id: string | null;
  promotionCode: string | null;
  cardTypeName: string | null;
  issueDate: string | null;
  status: string | null;
  quantityPurchase: string | null;
};

export type TApplicablePolicy = {
  id: string | null;
  applicablePolicy: string | null;
  priority: string | null;
  applicable: string | null;
};

export type TDiscount = {
  id: string | null;
  programName: string | null;
  remainingApplications: string | null;
  status: string | null;
};

export type TMedicalCardFields = keyof TMedicalCard;
export type TApplicablePolicyFields = keyof TApplicablePolicy;
export type TDiscountFields = keyof TDiscount;
