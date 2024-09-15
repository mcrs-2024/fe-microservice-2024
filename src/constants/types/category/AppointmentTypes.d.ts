type TAppointmentTypes = {
  appAppointmentTypeCode: string | null;
  name: string | null;
} & TAuditInfo;

export type TAppointmentTypesFields = keyof TAppointmentTypes;

export type AppointmentTypesModalType = 'add' | 'edit' | 'view';

export type TFilterAppointmentTypes = {
  appAppointmentTypeCode: string | null;
  name: string | null;
};
