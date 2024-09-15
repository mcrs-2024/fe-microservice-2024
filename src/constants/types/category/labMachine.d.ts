type TLabMachine = {
  labMachineId: string;
  labMachineName: string;
  labMachineTypeCode: string;
  serialNumber: string;
  labMachineCode: number | null;
  buySourceCode: string;
  employeeRunningMachine: string | null;
} & TAuditInfo;
export type TLabMachineFields = keyof TLabMachine;
export type LabMachineModalType = 'add' | 'edit' | 'view';

export type TFilterLabMachine = {
  labMachineName: string; //tên
};
