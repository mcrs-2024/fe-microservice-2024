import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  CloseCircleFilled,
  DollarOutlined,
  DoubleRightOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PrinterOutlined,
  SaveOutlined,
  ScanOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  message,
  Row,
  Segmented,
  Space,
  Tabs,
  UploadFile,
} from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import { RcFile } from 'antd/es/upload';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import {
  ACCIDENT,
  APPOINTMENT_SERVICE,
  CLASSIFICATION,
  FEE_PAYER,
  FROM_HOSPITAL,
  GENDER,
  INVOICE_GROUP,
  MEDICALLY_EXAMINATION_PLACE,
  PRIORITY_PATIENT,
  ROUTE,
  SOURCE,
  VISIT_TYPE,
} from 'src/constants/dumb/registration';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { ServiceConfigModalType } from 'src/constants/types/category/serviceConfiguration';
import { TRegistration } from 'src/constants/types/registration/registration';
import useRedux, { useAppSelector } from 'src/hooks/useRedux';
import {
  addButton,
  ButtonProps,
  resetButton,
} from 'src/redux toolkit/buttonsSlice';
import { RootStateToolKit } from 'src/redux toolkit/store';
import { LayoutState } from 'src/redux/reducers';
import { getDataURI } from 'src/utils/image';
import { yupObject } from 'src/utils/validate';

import CardDetail from '../CardInformation';
import PatientQueue from '../PatientQueue';

import RelationInfo from './Components/RelationInfo';
import SegmentedRegistration from './Components/Segmented';
import TransferInfo from './Components/TransferInfo';

import './style.scss';

const defaultValue: TRegistration = {
  id: null,
  fullNamePatient: null,
  dateOfBirthPatient: null,
  genderPatient: null,
  phoneNumberPatient: null,
  provincePatient: null,
  districtPatient: null,
  wardPatient: null,
  addressPatient: null,
  imagePatient: null,
  agePatient: null,
  patientId: null,
  hospitalizationDatetime: null,
  classification: null,
  visitType: null,
  source: null,
  fromHospital: null,
  accident: null,
  feePayer: null,
  invoiceGroup: null,
  followUpAppointment: null,
  packageHealthCheckup: null,
  healthCheckUpHasBeenReceived: null,

  showAllDoctor: null,
  medicalReason: null,
  guardian: null,
  entitiesSubjectToTheCapOfBasicMonthlySalaries: null,
  amountCoveredByExemptionAndCopayment: null,
  amountCoveredByExemptionAndCopaymentDate: null,
  appointmentService: null,
  copayment: null,
  room: null,
  remainOfPatientPayment: null,
  priority: null,
  allowSmartphoneApplication: null,
  paidOnRegistration: null,
  lifeInsurance: null,

  primaryLanguage: null,
  identifyCardNumber: null,
  dateOfIssue: null,
  placeOfIssue: null,
  nationality: null,
  ethnicGroup: null,
  religion: null,
  job: null,
  placeOfWork: null,

  relationFullName: null,
  relationDateOfBirth: null,
  gender: null,
  relationProvince: null,
  relationDistrict: null,
  relationWard: null,
  mobilePhone: null,
  homeAddress: null,
  relationWithPatient: null,

  cardIdentify: null,
  cardName: null,
  dateOfBirth: null,
  applyOrder: null,
  medicallyExaminationPlace: null,
  consecutiveYears: null,
  addressOfCard: null,
  nameOfOrganization: null,
  jobPosition: null,
  validFrom: null,
  validTo: null,
  month: null,
  year: null,
  age: null,
  HouseStress: null,
  districtCity: null,
  MedicareSubjectDetails: null,
  Route: null,
};

interface ButtonConfig {
  icon: JSX.Element;
  text: string;
  id: string;
}
const RegistrationModal = () => {
  const { t } = useTranslation();
  const [showRelationInfo, setShowRelationInfo] = useState<boolean>(false);
  const [showTransferInfo, setShowTransferInfo] = useState<boolean>(false);
  const formSchema = yupObject({});
  const { appSelector } = useRedux();
  const { leftSideBarType } = appSelector(LayoutState);
  const formControl = useFormik<TRegistration>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TRegistration) => {
      //   try {
      //       const res = await chapterApi.createChapter(data);
      //       if (res.data.code) {
      //         formControl.resetForm();
      //         message.success(res.data.message);
      //       } else {
      //         message.error(res.data.message);
      //       }
      //     }
      //   } catch (error) {
      //     message.error(error);
      //   }
    },
  });
  const handleToggle = (text: string, value: number) => {
    const stateMap: {
      [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
    } = {
      transfer: setShowTransferInfo,
      relation: setShowRelationInfo,
    };

    const setState = stateMap[text];
    if (setState) {
      setState(value === 1);
    }
  };
  const handleChange = (key: keyof TRegistration, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  const handleResetForm = () => {
    formControl.resetForm();
  };

  const inputPatientInformation: InputProps[] = [
    {
      name: 'patientId',
      key: 'patientId',
      label: t('patientId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientId,
      className: 'input-patient-id',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientId', e.target.value);
      },
      span: 5,
    },
    {
      name: 'fullNamePatient',
      key: 'fullNamePatient',
      label: t('fullNamePatient'),
      value: formControl.values.fullNamePatient,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fullNamePatient', e.target.value);
      },
      span: 7,
    },

    {
      name: 'dateOfBirth',
      key: 'dateOfBirth',
      label: t('dateOfBirth'),
      value: formControl.values.dateOfBirth,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('dateOfBirth', dateString);
      },
      span: 4,
    },
    {
      name: 'year',
      key: 'year',
      label: t('year'),
      value: formControl.values.year,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('year', e.target.value);
      },
      span: 4,
    },
    {
      name: 'age',
      key: 'age',
      label: t('age'),
      value: formControl.values.age,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('age', e.target.value);
      },
      span: 2,
    },
    {
      name: 'month',
      key: 'month',
      label: t('month'),
      value: formControl.values.month,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('month', e.target.value);
      },
      span: 2,
    },
    {
      name: 'genderPatient',
      key: 'genderPatient',
      label: t('genderPatient'),
      value: formControl.values.genderPatient,
      type: TYPE_FIELD.SELECT,
      options: GENDER,
      onChange: (value: string | null) => {
        handleChange('genderPatient', value);
      },
      span: 5,
    },
    {
      name: 'phoneNumberPatient',
      key: 'phoneNumberPatient',
      label: t('phoneNumberPatient'),
      value: formControl.values.phoneNumberPatient,
      type: TYPE_FIELD.TEXT,
      className: 'input-phoneNumberPatient-id',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('phoneNumberPatient', e.target.value);
      },
      span: 4,
    },
    {
      name: 'nationality',
      key: 'nationality',
      label: t('nationality'),
      value: formControl.values.nationality,
      type: TYPE_FIELD.SELECT,
      options: [],
      onChange: (value: string | null) => {
        handleChange('nationality', value);
      },
      span: 3,
    },
    {
      name: 'ethnicGroup',
      key: 'ethnicGroup',
      label: t('ethnicGroup'),
      value: formControl.values.ethnicGroup,
      type: TYPE_FIELD.SELECT,
      options: [],
      onChange: (value: string | null) => {
        handleChange('ethnicGroup', value);
      },
      span: 4,
    },

    {
      name: 'job',
      key: 'job',
      label: t('job'),
      value: formControl.values.job,
      type: TYPE_FIELD.SELECT,
      options: [],
      onChange: (value: string | null) => {
        handleChange('job', value);
      },
      span: 4,
    },
    {
      name: 'identifyCardNumber',
      key: 'identifyCardNumber',
      label: t('identifyCardNumber'),

      value: formControl.values.identifyCardNumber,
      type: TYPE_FIELD.TEXT,

      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('identifyCardNumber', e.target.value);
      },
      span: 4,
    },
    {
      name: 'HouseStress',
      key: 'HouseStress',
      label: t('HouseStress'),
      value: formControl.values.HouseStress,
      type: TYPE_FIELD.TEXT,
      className: 'box-registration',
      span: 12,
      options: [],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('HouseStress', e.target.value);
      },
    },
    {
      name: 'districtCity',
      key: 'districtCity',
      label: t('districtCity'),
      value: formControl.values.districtCity,
      type: TYPE_FIELD.SELECT,
      className: 'box-registration',
      span: 12,
      options: [],
      onChange: (value: string | null) => {
        handleChange('districtCity', value);
      },
    },
  ];

  const inputRegistrationInformation: InputProps[] = [
    {
      name: 'hospitalizationDatetime',
      label: t('hospitalizationDatetime'),
      key: 'hospitalizationDatetime',
      value: formControl.values.hospitalizationDatetime,
      type: TYPE_FIELD.DATE_PICKER,
      className: 'input-Date-id',
      onChange: (_, dateString: string) => {
        handleChange('hospitalizationDatetime', dateString);
      },
      span: 6,
    },

    {
      name: 'visitType',
      label: t('visitType'),
      key: 'visitType',
      value: formControl.values.visitType,
      type: TYPE_FIELD.SELECT,
      options: VISIT_TYPE,
      onChange: (value: string | null) => {
        handleChange('visitType', value);
      },
      span: 6,
    },
    {
      name: 'source',
      label: t('source'),
      key: 'source',
      value: formControl.values.source,
      type: TYPE_FIELD.SELECT,
      options: SOURCE,
      onChange: (value: string | null) => {
        handleChange('source', value);
      },
      span: 6,
    },
    {
      name: 'classification',
      label: t('classification'),
      key: 'classification',
      value: formControl.values.classification,
      type: TYPE_FIELD.SELECT,
      options: CLASSIFICATION,
      onChange: (value: string | null) => {
        handleChange('classification', value);
      },
      span: 6,
    },
    {
      name: 'feePayer',
      label: t('feePayer'),
      key: 'feePayer',
      value: formControl.values.feePayer,
      type: TYPE_FIELD.SELECT,
      options: FEE_PAYER,
      onChange: (value: string | null) => {
        handleChange('feePayer', value);
      },
      span: 4,
    },
    {
      name: 'cardIdentify',
      key: 'cardIdentify',
      // label: t('cardIdentify'),
      value: formControl.values.cardIdentify,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('cardIdentify', e.target.value);
      },
      span: 2,
    },

    {
      name: 'applyOrder',
      label: t('applyOrder'),
      key: 'applyOrder',
      value: formControl.values.applyOrder,
      type: TYPE_FIELD.TEXT,
      options: FEE_PAYER,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('applyOrder', e.target.value);
      },
      span: 6,
    },

    {
      name: 'validFrom',
      key: 'validFrom',
      label: t('validFrom'),
      className: 'input-Date-id',
      value: formControl.values.validFrom,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('validFrom', dateString);
      },
      span: 6,
    },
    {
      name: 'validTo',
      key: 'validTo',
      label: t('validTo'),
      className: 'input-Date-id',
      value: formControl.values.validTo,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('validTo', dateString);
      },
      span: 6,
    },
    {
      name: 'MedicareSubjectDetails',
      label: t('MedicareSubjectDetails'),
      key: 'MedicareSubjectDetails',
      value: formControl.values.MedicareSubjectDetails,
      type: TYPE_FIELD.TEXT,
      span: 12,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('MedicareSubjectDetails', e.target.value);
      },
    },
    {
      name: 'amountCoveredByExemptionAndCopaymentDate',
      key: 'amountCoveredByExemptionAndCopaymentDate',
      label: t('amountCoveredByExemptionAndCopaymentDate'),
      value: formControl.values.amountCoveredByExemptionAndCopaymentDate,
      type: TYPE_FIELD.DATE_PICKER,
      className: 'input-Date-id',
      onChange: (_, dateString: string) => {
        handleChange('amountCoveredByExemptionAndCopaymentDate', dateString);
      },
      span: 6,
    },
    {
      name: 'consecutiveYears',
      key: 'consecutiveYears',
      label: t('consecutiveYears'),
      value: formControl.values.consecutiveYears,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('consecutiveYears', e);
      },
      span: 6,
    },

    {
      name: 'medicallyExaminationPlace',
      key: 'medicallyExaminationPlace',
      label: t('medicallyExaminationPlace'),
      value: formControl.values.medicallyExaminationPlace,
      options: MEDICALLY_EXAMINATION_PLACE,
      type: TYPE_FIELD.SELECT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('medicallyExaminationPlace', e);
      },
      span: 12,
    },
    {
      name: 'Route',
      key: 'Route',
      label: t('Route'),
      value: formControl.values.Route,
      options: ROUTE,
      type: TYPE_FIELD.SELECT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('Route', e);
      },
      span: 6,
    },
    {
      name: 'priority_patient',
      key: 'priority_patient',
      label: t('Priority Patient'),
      value: formControl.values.provincePatient,
      options: PRIORITY_PATIENT,
      type: TYPE_FIELD.SELECT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('provincePatient', e);
      },
      span: 6,
    },
  ];

  const inputRelationInformation: InputProps[] = [
    {
      name: 'relationWithPatient',
      label: t('relationFullName'),
      key: 'relationWithPatient',
      value: formControl.values.relationWithPatient,
      options: [
        { value: 'parent', label: t('Parent') },
        { value: 'sibling', label: t('Sibling') },
        { value: 'child', label: t('Child') },
        { value: 'spouse', label: t('Spouse') },
        { value: 'other', label: t('Other') },
      ],
      span: 4,
      type: TYPE_FIELD.SELECT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationWithPatient', e);
      },
    },
    {
      name: 'relationFullName',
      // label: t('relationFullName'),
      key: 'relationFullName',
      value: formControl.values.relationFullName,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationFullName', e.target.value);
      },
      span: 8,
    },
    {
      name: 'relationDateOfBirth',
      label: t('relationDateOfBirth'),
      key: 'relationDateOfBirth',
      value: formControl.values.relationDateOfBirth,
      type: TYPE_FIELD.DATE_PICKER,
      className: 'input-Date-id',
      onChange: (_, dateString: string) => {
        handleChange('relationDateOfBirth', dateString);
      },
      span: 6,
    },
    {
      name: 'mobilePhone',
      label: t('mobilePhone'),
      key: 'mobilePhone',
      value: formControl.values.mobilePhone,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('mobilePhone', e.target.value);
      },
      span: 6,
    },
    {
      name: 'homeAddress',
      label: t('homeAddress'),
      key: 'homeAddress',
      value: formControl.values.homeAddress,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('homeAddress', e.target.value);
      },
      span: 12,
    },
    {
      name: 'relationAddress',
      label: t('relationAddress'),
      key: 'relationAddress',
      value: formControl.values.relationProvince,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationProvince', e.target.value);
      },
      span: 12,
    },
  ];
  const inputTransferInformation: InputProps[] = [
    {
      name: 'GCTCode',
      label: t('GCTCode'),
      key: 'GCTCode',
      value: formControl.values.relationFullName,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationFullName', e.target.value);
      },
      span: 4,
    },
    {
      name: 'Count',
      label: t('Count'),
      key: 'Count',
      value: formControl.values.relationDateOfBirth,
      type: TYPE_FIELD.TEXT,
      className: 'input-Date-id',
      onChange: (_, dateString: string) => {
        handleChange('relationDateOfBirth', dateString);
      },
      span: 2,
    },
    {
      name: 'PlaceTransfer',
      label: t('PlaceTransfer'),
      key: 'PlaceTransfer',
      value: formControl.values.gender,
      type: TYPE_FIELD.TEXT,
      onChange: (value: string | null) => {
        handleChange('gender', value);
      },
      span: 6,
    },
    {
      name: 'validFrom',
      label: t('validFrom'),
      key: 'validFrom',
      value: formControl.values.gender,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (value: string | null) => {
        handleChange('gender', value);
      },
      span: 6,
    },
    {
      name: 'validTo',
      label: t('validTo'),
      key: 'validTo',
      value: formControl.values.relationProvince,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationProvince', e.target.value);
      },
      span: 6,
    },
    {
      name: 'Diagnose',
      label: t('Diagnose'),
      key: 'Diagnose',
      value: formControl.values.relationDistrict,
      type: TYPE_FIELD.AUTO_COMPLETE,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationDistrict', e.target.value);
      },
      span: 4,
    },
    {
      name: '',
      label: t(''),
      key: '',
      value: formControl.values.relationDistrict,
      type: TYPE_FIELD.AUTO_COMPLETE,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relationDistrict', e.target.value);
      },
      span: 8,
    },
    // {
    //   name: '',
    //   label: '',
    //   key: '',
    //   value: '',
    //   type: TYPE_FIELD.TEXT,
    //   onChange: () => {},
    //   span: 4,
    // },
  ];
  const buttonConfigs: ButtonConfig[] = [
    {
      icon: <PrinterOutlined />,
      text: t('XNResult'),
      id: 'exportsButtonRegistration',
    },
    {
      icon: <PrinterOutlined />,
      text: t('CLSResult'),
      id: 'clsButtonRegistration',
    },
    {
      icon: <DoubleRightOutlined />,
      text: t('STTPrint'),
      id: 'sttButtonRegistration',
    },
    {
      icon: <PlusOutlined />,
      text: t('Assign Service'),
      id: 'dvButtonRegistration',
    },
    {
      icon: <DollarOutlined />,
      text: t('Service'),
      id: 'paymentButtonRegistration',
    },
    {
      icon: <PlusCircleOutlined />,
      text: t('Add_new'),
      id: 'addButtonRegistration',
    },
    { icon: <EditOutlined />, text: t('Edit'), id: 'editButtonRegistration' },
    { icon: <SaveOutlined />, text: t('Save'), id: 'saveButtonRegistration' },
  ];
  return (
    <>
      <Space
        direction='horizontal'
        className='d-flex'
        style={{ alignItems: 'flex-start', padding: '5px 0px' }}
      >
        <div style={{ width: '100%', display: 'flex' }}>
          <Space
            direction='horizontal'
            className='d-flex'
            style={{ alignItems: 'flex-start', width: '100%' }}
          >
            <Card
              title={
                <div className='title-patient'>
                  <div>{t('PatientInformation')}</div>
                  <div className='content-title'>
                    <ScanOutlined className='icon' />
                    <span>Scan thẻ BHYT</span>
                  </div>
                </div>
              }
              extra={
                <>
                  {!showRelationInfo ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        handleToggle('relation', 1);
                      }}
                      icon={<PlusCircleOutlined />}
                    >
                      {t('RelationInformation')}
                    </Button>
                  ) : (
                    <Button
                      type='default'
                      onClick={() => {
                        handleToggle('relation', 2);
                      }}
                      icon={<CloseCircleFilled />}
                    >
                      {t('RelationInformation')}
                    </Button>
                  )}
                </>
              }
              style={{ width: '100%' }}
            >
              <InputFields
                inputs={inputPatientInformation}
                form={formControl}
                gutter={[16, 16]}
                isHorizontal={true}
              />
            </Card>
          </Space>
        </div>
      </Space>
      <div className={`collapse-content ${showRelationInfo ? 'active' : ''}`}>
        <RelationInfo inputs={inputRelationInformation} form={formControl} />
      </div>
      <Space
        direction='horizontal'
        className='d-flex'
        style={{ alignItems: 'flex-start', padding: '5px 0px' }}
      >
        <div style={{ width: '100%', display: 'flex' }}>
          <Space
            direction='horizontal'
            className='d-flex'
            style={{ alignItems: 'flex-start', width: '100%' }}
          >
            <Card
              title={t('ReceptionInformation')}
              extra={
                <>
                  {!showTransferInfo ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        handleToggle('transfer', 1);
                      }}
                      icon={<PlusCircleOutlined />}
                    >
                      {t('GCTInformation')}
                    </Button>
                  ) : (
                    <Button
                      type='default'
                      onClick={() => {
                        handleToggle('transfer', 2);
                      }}
                      icon={<CloseCircleFilled />}
                    >
                      {t('GCTInformation')}
                    </Button>
                  )}
                </>
              }
              style={{ width: '100%' }}
            >
              <InputFields
                inputs={inputRegistrationInformation}
                form={formControl}
                gutter={[16, 16]}
                isHorizontal={true}
              />
            </Card>
          </Space>
        </div>
      </Space>
      <div className={`collapse-content ${showTransferInfo ? 'active' : ''}`}>
        <TransferInfo inputs={inputTransferInformation} form={formControl} />
      </div>
      <SegmentedRegistration />
      <div
        className={`sub ${leftSideBarType === 'default' ? 'desktop' : 'mobile'}`}
      >
        <div>
          {buttonConfigs.map(button => (
            <ButtonCustom.Default
              action={PERMISSION_CODES.CREATE}
              key={button.id}
              className='btn-sub'
              type='primary'
              icon={button.icon}
              onClick={() => {}}
            >
              {button.text}
            </ButtonCustom.Default>
          ))}
        </div>
      </div>
    </>
  );
};

export default RegistrationModal;
