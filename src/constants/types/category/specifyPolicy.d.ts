type TSpecifyPolicy = {
  specifyPolicyGroupCode: string;
  specifyPolicyGroupName: string;
  specifyPolicyGroupDescription: string;
} & TAuditInfo;
export type TSpecifyPolicyFields = keyof TSpecifyPolicy;
export type SpecifyPolicyModalType = 'add' | 'edit' | 'view';

export type TFilterSpecifyPolicy = {
  specifyPolicyGroupCode: string;
  specifyPolicyGroupName: string;
};
