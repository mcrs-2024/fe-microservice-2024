export type TAppointmentReschedule = {
  appAppointmentRescheduleReasonCode: string | null;
  name: string | null;
} & TAuditInfo;
export type TAppointmentRescheduleFields = keyof TAppointmentReschedule;
export type AppointmentRescheduleModalType = 'add' | 'edit' | 'view';

export type TFilterAppointmentReschedule = {
  appAppointmentRescheduleReasonCode: string | null;
};
