export type TAppointmentMethod = {
  id: string | null;
  appAppointmentMethodName: string | null;
  appAppointmentMethodDescription: string | null;
} & TAuditInfo;

export type TAppointmentMethodFields = keyof TAppointmentMethod;

export type AppointmentMethodModalType = 'add' | 'edit' | 'view';

export type TFilterAppointmentMethod = {
  appAppointmentMethodName: string | null;
};
