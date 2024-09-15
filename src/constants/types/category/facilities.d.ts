export type TFacility = {
  id: string | null;
  customerID: string | null;
  facilityID: string | null;
  healthcareFacilityCode: string | null;
  facilityFullName: string | null;
  facilityFullNameUnUnicode: string | null;
  facilityShortName: string | null;
  prefixName: string | null;
  managementAuthority: string | null;
  higherAuthorityName: string | null;
  higherAuthorityShortName: string | null;
  hospitalClass: string | null;
  customerNote: string | null;
  customerAddress: string | null;
  provinceID: string | null;
  districtID: string | null;
  wardID: string | null;
  telephone: string | null;
  telephoneSecond: string | null;
  hotline: string | null;
  email: string | null;
  website: string | null;
  fax: string | null;
  tax: string | null;
  pharmacyTax: string | null;
  isActived: string | null;
  logo: string | null;
  logoHeader: string | null;
  watermark: string | null;
  insuranceUsername: string | null;
  insurancePassword: string | null;
  vaccineGateUsername: string | null;
  vaccineGatePassword: string | null;
  nationalPharmacyCode: string | null;
  representative: string | null;
  position: string | null;
  haveInsurance: string | null;
  smsAllow: string | null;
} & TAuditInfo;

export type TFacilityFields = keyof TFacility;

export type FacilityModalType = 'add' | 'edit' | 'view';

export type TFilterFacility = {
  facilityFullName: string | null;
};
