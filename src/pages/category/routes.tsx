import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  categoryAccident,
  categoryAccountType,
  categoryActiveIngredient,
  categoryAllergie,
  categoryApplicationType,
  categoryAppointmentCancel,
  categoryAppointmentMethod,
  categoryAppointmentReschedule,
  categoryAppointmentTypes,
  categoryArea,
  categoryClinic,
  categoryDebt,
  categoryDepartment,
  categoryDiagnoseTemplate,
  categoryDistrict,
  categoryDocumentProtection,
  categoryDocumenTypes,
  categoryEthnicity,
  categoryFacility,
  categoryFileTempletes,
  categoryGuarantees,
  categoryHealth,
  categoryICD10,
  categoryIcdConfiguration,
  categoryIndicatorType,
  categoryJobTitle,
  categoryLapMachine,
  categoryMedicalRecord,
  categoryModule,
  categoryNation,
  categoryPatient,
  categoryPatientTreatment,
  categoryPaymentGroups,
  categoryPaymentReference,
  categoryPaymentType,
  categoryPersonIndicator,
  categoryPolicyType,
  categoryPricePolicies,
  categoryPricePolicyType,
  categoryProvince,
  categoryQualification,
  categoryRegistration,
  categoryResearchArea,
  categoryRevenueGroups,
  categoryRoom,
  categoryRoute,
  categoryServiceConfig,
  categoryserviceConfigurationStatus,
  categorySource,
  categorySpecifyPolicy,
  categorySpecifySurgical,
  categoryTestingMachine,
  categoryTopicAssignment,
  categoryTreatmentPlans,
  categoryUsers,
  categoryvehicles,
  categoryVisitReason,
  categoryWard,
  categoryWarehouseLocation,
  categoryXnIndexConfiguration,
} from 'src/routes/routes.contants';

import Accident from './Accident';
import AccountType from './AccountType';
import ActiveIngredient from './ActiveIngredient';
import Allergin from './allergie';
import ApplicationType from './ApplicationType';
import AppointmentCancel from './AppointmentCancel';
import AppointmentMethod from './AppointmentMethod';
import AppointmentReschedule from './AppointmentReschedule';
import AppointmentTypes from './AppointmentType';
import Area from './Area';
import Clinic from './Clinic';
import Country from './Country';
import Debt from './Debt';
import Department from './Department';
import DiagnoseTemplate from './DiagnoseTemplate';
import CategoryDistinc from './Distinct';
import DocumentProtection from './DocumentProtection';
import DocumentTypes from './DocumenType';
import Ethnicity from './Ethnicity';
import Facilities from './Facility';
import FileTemplete from './FileTemplete';
import Guarantee from './Guarantee';
import Health from './Health';
import ICD from './ICD';
import IcdConfiguration from './IcdConfiguration';
import IndicatorType from './IndicatorType';
import JobTitle from './JobTitle';
import LabMachine from './LabMachine';
import CategoryModule from './Module';
import Nation from './Nation';
import Patient from './Patient';
import PatientTreatment from './PatientTreatment';
import PaymentGroups from './PaymentGroup';
import PaymentReference from './PaymentReference';
import PaymentType from './PaymentType';
import PersonIndicator from './PersonIndicator';
import PolicyType from './PolicyType';
import PricePolicies from './PricePolicy';
import PricePolicyType from './PricePolicyType';
import CategoryProvince from './Province';
import Qualification from './Qualification';
import CategoryRegistration from './Registration';
import ResearchArea from './ResearchArea';
import RevenueGroups from './RevenueGroup';
import Room from './Room';
import ServiceConfiguration from './ServiceConfiguration';
import ServiceConfigurationStatusName from './ServiceConfigurationStatus';
import SpecifyPolicy from './SpecifyPolicy';
import SpecifySurgical from './SpecifySurgical';
import TestingMachine from './TestingMachine';
import TopicAssignment from './TopicAssignment';
import TreatmentPlans from './TreatmentPlan';
import Users from './Users';
import Vehicles from './Vehicle';
import VisitReason from './VisitReason';
import VisitSource from './VisitSource';
import CategoryWard from './Ward';
import WarehouseLocation from './WarehouseLocation';
import XnIndexConfiguration from './XnIndexConfiguration';

const CategoryMedicalRecord = lazy(
  () => import('src/pages/category/CategoryMedicalRecord'),
);

const categoryRoutes = {
  path: categoryRoute,
  name: 'categoryRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: categoryMedicalRecord,
      element: <CategoryMedicalRecord />,
      route: PrivateRoute,
    },
    {
      path: categoryActiveIngredient,
      element: <ActiveIngredient />,
      route: PrivateRoute,
    },
    {
      path: categoryServiceConfig,
      element: <ServiceConfiguration />,
      route: PrivateRoute,
    },
    {
      path: categoryPricePolicies,
      element: <PricePolicies />,
      route: PrivateRoute,
    },
    {
      path: categoryXnIndexConfiguration,
      element: <XnIndexConfiguration />,
      route: PrivateRoute,
    },
    {
      path: categoryTestingMachine,
      element: <TestingMachine />,
      route: PrivateRoute,
    },
    {
      path: categoryHealth,
      element: <Health />,
      route: PrivateRoute,
    },
    {
      path: categoryLapMachine,
      element: <LabMachine />,
      route: PrivateRoute,
    },
    {
      path: categoryDebt,
      element: <Debt />,
      route: PrivateRoute,
    },
    {
      path: categoryAccident,
      element: <Accident />,
      route: PrivateRoute,
    },
    {
      path: categoryModule,
      element: <CategoryModule />,
      route: PrivateRoute,
    },
    {
      path: categorySource,
      element: <VisitSource />,
      route: PrivateRoute,
    },
    {
      path: categoryICD10,
      element: <ICD />,
      route: PrivateRoute,
    },
    {
      path: categoryAppointmentCancel,
      element: <AppointmentCancel />,
      route: PrivateRoute,
    },
    {
      path: categoryRegistration,
      element: <CategoryRegistration />,
      route: PrivateRoute,
    },
    {
      path: categoryPricePolicyType,
      element: <PricePolicyType />,
      route: PrivateRoute,
    },
    {
      path: categoryAppointmentReschedule,
      element: <AppointmentReschedule />,
      route: PrivateRoute,
    },
    {
      path: categoryPersonIndicator,
      element: <PersonIndicator />,
      route: PrivateRoute,
    },
    {
      path: categoryFacility,
      element: <Facilities />,
      route: PrivateRoute,
    },
    {
      path: categoryvehicles,
      element: <Vehicles />,
      route: PrivateRoute,
    },
    {
      path: categoryFileTempletes,
      element: <FileTemplete />,
      route: PrivateRoute,
    },
    {
      path: categoryAppointmentTypes,
      element: <AppointmentTypes />,
      route: PrivateRoute,
    },
    {
      path: categoryPolicyType,
      element: <PolicyType />,
      route: PrivateRoute,
    },
    {
      path: categoryWarehouseLocation,
      element: <WarehouseLocation />,
      route: PrivateRoute,
    },
    {
      path: categoryVisitReason,
      element: <VisitReason />,
      route: PrivateRoute,
    },
    {
      path: categoryProvince,
      element: <CategoryProvince />,
      route: PrivateRoute,
    },
    {
      path: categoryDistrict,
      element: <CategoryDistinc />,
      route: PrivateRoute,
    },
    {
      path: categoryWard,
      element: <CategoryWard />,
      route: PrivateRoute,
    },
    {
      path: categoryIcdConfiguration,
      element: <IcdConfiguration />,
      route: PrivateRoute,
    },
    {
      path: categoryRevenueGroups,
      element: <RevenueGroups />,
      route: PrivateRoute,
    },
    {
      path: categoryIndicatorType,
      element: <IndicatorType />,
      route: PrivateRoute,
    },
    {
      path: categoryGuarantees,
      element: <Guarantee />,
      route: PrivateRoute,
    },
    {
      path: categoryDiagnoseTemplate,
      element: <DiagnoseTemplate />,
      route: PrivateRoute,
    },
    {
      path: categoryTreatmentPlans,
      element: <TreatmentPlans />,
      route: PrivateRoute,
    },
    {
      path: categoryPatientTreatment,
      element: <PatientTreatment />,
      route: PrivateRoute,
    },
    {
      path: categoryPaymentReference,
      element: <PaymentReference />,
      route: PrivateRoute,
    },
    {
      path: categorySpecifyPolicy,
      element: <SpecifyPolicy />,
      route: PrivateRoute,
    },
    {
      path: categoryPaymentType,
      element: <PaymentType />,
      route: PrivateRoute,
    },
    {
      path: categoryPaymentGroups,
      element: <PaymentGroups />,
      route: PrivateRoute,
    },
    {
      path: categoryserviceConfigurationStatus,
      element: <ServiceConfigurationStatusName />,
      route: PrivateRoute,
    },
    {
      path: categoryTopicAssignment,
      element: <TopicAssignment />,
      route: PrivateRoute,
    },
    {
      path: categorySpecifySurgical,
      element: <SpecifySurgical />,
      route: PrivateRoute,
    },
    {
      path: categoryDocumentProtection,
      element: <DocumentProtection />,
      route: PrivateRoute,
    },
    {
      path: categoryQualification,
      element: <Qualification />,
      route: PrivateRoute,
    },
    {
      path: categoryAllergie,
      element: <Allergin />,
      route: PrivateRoute,
    },
    {
      path: categoryAccountType,
      element: <AccountType />,
      route: PrivateRoute,
    },
    {
      path: categoryResearchArea,
      element: <ResearchArea />,
      route: PrivateRoute,
    },
    {
      path: categoryDocumenTypes,
      element: <DocumentTypes />,
      route: PrivateRoute,
    },
    {
      path: categoryClinic,
      element: <Clinic />,
      route: PrivateRoute,
    },
    {
      path: categoryApplicationType,
      element: <ApplicationType />,
      route: PrivateRoute,
    },
    {
      path: categoryAppointmentMethod,
      element: <AppointmentMethod />,
      route: PrivateRoute,
    },
    {
      path: categoryDepartment,
      element: <Department />,
      route: PrivateRoute,
    },
    {
      path: categoryUsers,
      element: <Users />,
      route: PrivateRoute,
    },
    {
      path: categoryRoom,
      element: <Room />,
      route: PrivateRoute,
    },
    {
      path: categoryPatient,
      element: <Patient />,
      route: PrivateRoute,
    },
    {
      path: categoryNation,
      element: <Nation />,
      route: PrivateRoute,
    },
    {
      path: categoryEthnicity,
      element: <Ethnicity />,
      route: PrivateRoute,
    },
    {
      path: categoryJobTitle,
      element: <JobTitle />,
      route: PrivateRoute,
    },
    {
      path: categoryArea,
      element: <Area />,
      route: PrivateRoute,
    },
  ],
};
export default categoryRoutes;
