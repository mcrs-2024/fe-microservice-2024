export type TRegistration = {
  //Patient information
  id: string | null;
  fullNamePatient: string | null;
  dateOfBirthPatient: string | null;
  genderPatient: string | null;
  phoneNumberPatient: number | null;
  provincePatient: string | null;
  districtPatient: string | null;
  wardPatient: string | null;
  addressPatient: string | null;
  imagePatient: string | null;
  agePatient: number | null;
  patientId: string | null;
  //Registration information
  hospitalizationDatetime: string | null;
  classification: string | null;
  visitType: string | null;
  source: string | null;
  fromHospital: string | null;
  accident: string | null;
  feePayer: string | null; //đối tượng thu phí
  invoiceGroup: string | null;
  followUpAppointment: string | null; //Có hẹn tái khám
  packageHealthCheckup: string | null; //Khám theo gói
  healthCheckUpHasBeenReceived: string | null; //Khám sức khỏe đã tiếp nhận
  year: number | null;
  age: number | null;
  month: number | null;
  HouseStress: null | string;
  districtCity: string | null;

  //Consulting registration
  showAllDoctor: string | null;
  medicalReason: string | null;
  guardian: string | null; //Lý do bảo lãnh
  entitiesSubjectToTheCapOfBasicMonthlySalaries: string | null; //Đối tượng áp dụng mức trần 45 tháng lương cơ sở
  amountCoveredByExemptionAndCopayment: string | null; //Số miễn cùng chi trả
  amountCoveredByExemptionAndCopaymentDate: string | null;
  appointmentService: string | null;
  room: string | null;
  copayment: string | null;
  remainOfPatientPayment: string | null;
  priority: string | null;
  allowSmartphoneApplication: string | null;
  paidOnRegistration: string | null;
  lifeInsurance: string | null; //Bảo hiểm nhân thọ

  //Personal extend information
  primaryLanguage: string | null;
  identifyCardNumber: number | null;
  dateOfIssue: string | null;
  placeOfIssue: string | null;
  nationality: string | null;
  ethnicGroup: string | null;
  religion: string | null;
  job: string | null;
  placeOfWork: string | null;

  //Relation information
  relationFullName: string | null;
  relationDateOfBirth: string | null;
  gender: string | null;
  relationProvince: string | null;
  relationDistrict: string | null;
  relationWard: string | null;
  mobilePhone: number | null;
  homeAddress: string | null;
  relationWithPatient: string | null;

  //Insurance card information
  cardIdentify: string | null;
  cardName: string | null;
  dateOfBirth: string | null;
  applyOrder: string | null;
  medicallyExaminationPlace: string | null;
  consecutiveYears: string | null;
  addressOfCard: string | null;
  nameOfOrganization: string | null;
  jobPosition: string | null;
  validFrom: string | null;
  validTo: string | null;
  MedicareSubjectDetails: string | null;
  Route: string | null;
};

export type TRegistrationFields = keyof TRegistration;

export type TRegistrationModalType = 'add' | 'view' | 'edit';
