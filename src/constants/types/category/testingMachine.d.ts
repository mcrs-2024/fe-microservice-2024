type TTestingMachine = {
  labMachineTypeCode: string;
  labMachineTypeName: string;
} & TAuditInfo;
export type TTestingMachineFields = keyof TTestingMachine;
export type TestingMachineModalType = 'add' | 'edit' | 'view';

export type TFilterTestingMachine = {
  labMachineTypeName: string;
};
