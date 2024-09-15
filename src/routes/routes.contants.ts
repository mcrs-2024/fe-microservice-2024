// public route
export const loginRoute = '/auth/login';
export const homePageRoute = '/admin/user-function';

//auth
export const changeUserPassword = '/auth/update-password';

//admin route
export const adminRoute = '/admin';
export const usersRoute = '/admin/users';
export const userRolesRoute = '/admin/roles';
export const userAuthorizationRoute = '/admin/user-authorization';
export const userFunctionRoute = '/admin/user-function';
export const systemLogsRoute = '/admin/logs';
export const matrixAuthorizationRoute = '/admin/matrix-authorization';
export const accessHistoryRoute = '/admin/access-history';

// medicine store
export const medicineStoreRoute = '/warehouse/pharmaceuticals-data';
export const medicineStoreCreateRoute =
  '/warehouse/pharmaceuticals-data/create';
export const warehousePKK = '/warehouse/pkk';
export const medicineStoreCreatePhieuNhapRoute =
  '/warehouse/pharmaceuticals-data/createPhieuNhap';
export const medicineStoreCreatePhieuDuTruRoute =
  '/warehouse/pharmaceuticals-data/createPhieuDuTru';

// category
export const categoryRoute = '/category';
export const categorySystem = '/catalog/system';
export const categoryICDGroups = '/catalog/icd-groups';
export const categoryMedicalRecord = '/catalog/medical-records';
export const categoryActiveIngredient = '/catalog/interactions';
export const chapterCategoryRoute = '/catalog/icd-chapters';
export const categoryServiceConfig = '/catalog/service-configuration';
export const categoryPricePolicies = '/catalog/price-policies';
export const categoryXnIndexConfiguration = '/catalog/xn-index-configuration';
export const categoryTestingMachine = '/catalog/xn-machine-types';
export const categoryModule = '/catalog/functions';
export const categoryTypeICD = '/catalog/icd-types';
export const categoryHealth = '/catalog/health-classification';
export const categoryICD10 = '/catalog/icd10';
export const categoryLapMachine = '/catalog/xn-machines';
export const categoryDebt = '/catalog/debtors';
export const categoryAccident = '/catalog/accidents';
export const categoryRegistration = '/catalog/registration';
export const categorySource = '/catalog/sources';
export const categoryAppointmentCancel = '/catalog/cancel-appointments';
export const categoryPricePolicyType = '/catalog/price-policy-types';
export const categoryAppointmentReschedule = '/catalog/reschedule-reasons';
export const categoryPersonIndicator = '/catalog/card-types';
export const categoryFacility = '/catalog/facilities';
export const categoryvehicles = '/catalog/vehicles';
export const categoryFileTempletes = '/catalog/file-templates';
export const categoryAppointmentTypes = '/catalog/appointment-types';
export const categoryPolicyType = '/catalog/policy-types';
export const categoryWarehouseLocation =
  '/catalog/warehouse-location-configuration';
export const categoryVisitReason = '/catalog/visit-creation-reasons';
export const categoryProvince = '/catalog/provinces';
export const categoryWard = '/catalog/wards';
export const categoryDistrict = '/catalog/districts';
export const categoryIcdConfiguration = '/catalog/icd-configuration';
export const categoryRevenueGroups = '/catalog/revenue-groups';
export const categoryIndicatorType = '/catalog/cards';
export const categoryGuarantees = '/catalog/guarantees';
export const categoryDiagnoseTemplate = '/catalog/examination-templates';
export const categoryTreatmentPlans = '/catalog/treatment-directions';
export const categoryPatientTreatment = '/catalog/sample-developments';
export const categoryPaymentReference = '/catalog/payments';
export const categorySpecifyPolicy = '/catalog/service-appointment-groups';
export const categorySpecifySurgical = '/catalog/surgery-service-groups';
export const categoryDocumentProtection = '/catalog/document-security-levels';
export const categoryQualification = '/catalog/professional-qualifications';
export const categoryAllergie = '/catalog/allergies';
export const categoryAccountType = '/catalog/account-types';
export const categoryResearchArea = '/catalog/research-areas';
export const categoryDocumenTypes = '/catalog/document-types';
export const categoryTopicAssignment = '/catalog/topic-assignment';
export const categoryserviceConfigurationStatus =
  '/catalog/service-configuration-status';
export const categoryPaymentGroups = '/catalog/payment-groups';
export const categoryPaymentType = '/catalog/payment-types';
export const categoryClinic = '/catalog/clinic-services';
export const categoryApplicationType = '/catalog/application-types';
export const categoryAppointmentMethod = '/catalog/appointment-methods';
export const categoryDepartment = '/catalog/department';
export const categoryUsers = '/catalog/users';
export const categoryRoom = '/catalog/room';
export const categoryPatient = '/catalog/patient';
export const categoryNation = '/catalog/nation';
export const categoryEthnicity = '/catalog/ethnicity';
export const categoryJobTitle = '/catalog/job-title';
export const categoryArea = '/catalog/area';

export const categoryHisRoute = 'catalog/his';
export const categoryPriority = '/catelog/his/priority';
export const categoryReceivingSource = '/catelog/his/receiving-source';
export const categoryTransferInfo = '/catelog/his/transfer-info';
export const categoryvatInfo = '/catelog/his/VAT-info';
export const categoryRelativeCode = '/catelog/his/relative-code';
export const categoryInsuranceDetailCode =
  '/catelog/his/insurance-entity-detail-code';
export const categoryAdmissionReasonCode = '/catelog/his/admission-reason-code';
export const categoryAdmissionAreaCode = '/catelog/his/admission-area-code';
export const categoryAdmissionDeskCode = '/catelog/his/admission-desk-code';
export const categoryAdmissionShiftCode = '/catelog/his/admission-shift-code';
export const categoryPatientSubject = '/catelog/his/entity';
export const categoryCountry = '/catalog/country';

// MedicalSupplies store
export const medicalSuppliesStoreRoute = 'warehouse/assets-data';

// Appointment
export const receptionRoute = '/his';
export const appointmentReception = '/his/appointment';
export const healthContract = '/his/health-contract-personal';
export const healthContractOrganization = '/his/health-contract-organization';

//Registration
export const registrationRoute = '/his/patient-registration';
export const inpatientAdmissionRoute = '/his/inpatient-admission';
export const outpatientAdmissionRoute = '/his/outpatient-admission';
