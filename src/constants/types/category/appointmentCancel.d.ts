type TAppointmentCancel = {
  appAppointmentCancelReasonCode: string;
  name: string;
} & TAuditInfo;
export type TAppointmentCancelFields = keyof TAppointmentCancel;
export type AppointmentCancelModalType = 'add' | 'edit' | 'view';

export type TFilterAppointmentCancel = {
  appAppointmentCancelReasonCode: string;
  name: string;
};
