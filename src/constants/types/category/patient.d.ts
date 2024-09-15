type TPatient = {
  patientId: string | null;
  facilityId: string | null;
  patientHospitalId: string | null;
  fullName: string | null;
  fullNameUnUnicode: string | null;
  gender: string | null;
  genderText: string | null;
  dob: string | null;
  dobDD: number | null;
  dobMM: number | null;
  dobYYYY: number | null;
  ethnicityId: number | null;
  maritalStatus: string | null;
  occupationId: number | null;
  nationalId: number | null;
  fullAddress: string | null;
  street: string | null;
  countryId: number | null;
  provinceId: number | null;
  districtId: number | null;
  wardId: number | null;
  mobile: string | null;
  mobile2: string | null;
  isNameless: boolean | null;
  vaccineCode: string | null;
  patientPortalUsername: string | null;
  patientPortalPassword: string | null;
  email: string | null;
  birthCertificate: string | null;
  idPassport: string | null;
  isMerged: boolean | null;
  isDeleted: boolean | null;
  note: string | null;
} & TAuditInfo;

export type TPatientFields = keyof TPatient;

export type PatientModalType = 'add' | 'edit' | 'view';

export type TFilterPatient = {
  fullName: string;
};
