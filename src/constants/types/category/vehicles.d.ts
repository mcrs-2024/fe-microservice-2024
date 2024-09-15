type TVehicles = {
  id: string | null;
  carCode: string | null;
  licensePlates: string | null;
  department: string | null;
  comment: string | null;
  seqNum: number | null;
} & TAuditInfo;
export type TVehiclesFields = keyof TVehicles;
export type VehiclesModalType = 'add' | 'edit' | 'view';

export type TFilterVehicles = {
  carCode: string | null;
  licensePlates: string | null;
  department: string | null;
};
