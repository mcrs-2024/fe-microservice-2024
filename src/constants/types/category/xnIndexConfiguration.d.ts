export type TXnIndexConfiguration = {
  labMachineIndexCode: string | null;
  labMachineIndexName: string | null;
  labMachineTypeCode: string | null;
  labMachineCode: string | null;
};

export type TXnIndexConfigurationFields = keyof TXnIndexConfiguration;

export type XnIndexConfigurationModalType = 'add' | 'edit' | 'view';

export type TFilterXnIndexConfiguration = {
  labMachineIndexCode: string | null;
  labMachineIndexName: string | null;
};
