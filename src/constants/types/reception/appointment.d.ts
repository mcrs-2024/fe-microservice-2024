type TAppointment = {
  icdChapterCode: string;
  icdTypeCode: string;
  icdChapterNameV: string;
  icdChapterNameE: string;
  active: number | null;
} & TAuditInfo;

export type TAppointmentFields = keyof TAppointment;

export type AppointmentModalType = 'add' | 'edit' | 'view';

export type TFilterAppointment = {
  icdTypeCode: string;
  icdChapterNameV: string;
};
