type THealth = {
  healthScoreCode: string;
  healthScoreName: string;
} & TAuditInfo;
export type THealthFields = keyof THealth;
export type HealthModalType = 'add' | 'edit' | 'view';

export type TFilterHealth = {
  healthScoreCode: string;
  healthScoreName: string;
};
