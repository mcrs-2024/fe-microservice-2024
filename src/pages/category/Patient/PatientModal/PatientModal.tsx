// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  PatientModalType,
  TPatient,
} from 'src/constants/types/category/patient';
import accidentApi from 'src/helpers/api/category/acident';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PatientModalType;
  selectedRecord: TPatient | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPatient = {
  patientId: '',
  facilityId: '',
  patientHospitalId: '',
  fullName: '',
  fullNameUnUnicode: '',
  gender: '',
  genderText: '',
  dob: '',
  dobDD: 0,
  dobMM: 0,
  dobYYYY: 0,
  ethnicityId: null,
  maritalStatus: '',
  occupationId: 0,
  nationalId: 0,
  fullAddress: '',
  street: '',
  countryId: null,
  provinceId: null,
  districtId: null,
  wardId: null,
  mobile: '',
  mobile2: '',
  isNameless: false,
  vaccineCode: '',
  patientPortalUsername: '',
  patientPortalPassword: '',
  email: '',
  birthCertificate: '',
  idPassport: '',
  isMerged: false,
  isDeleted: false,
  note: '',
};

const PatientModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();

  const formSchema = yupObject({
    patientHospitalId: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    fullName: Yup.string().required(t('Please_enter_this_field')).nullable(),
    fullNameUnUnicode: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    gender: Yup.string().required(t('Please_enter_this_field')).nullable(),
    genderText: Yup.string().required(t('Please_enter_this_field')).nullable(),
    dob: Yup.string().required(t('Please_enter_this_field')).nullable(),
    maritalStatus: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    fullAddress: Yup.string().required(t('Please_enter_this_field')).nullable(),
    street: Yup.string().required(t('Please_enter_this_field')).nullable(),
    mobile: Yup.string().required(t('Please_enter_this_field')).nullable(),
    mobile2: Yup.string().required(t('Please_enter_this_field')).nullable(),
    vaccineCode: Yup.string().required(t('Please_enter_this_field')).nullable(),
    patientPortalUsername: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    patientPortalPassword: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    email: Yup.string().required(t('Please_enter_this_field')).nullable(),
    birthCertificate: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    idPassport: Yup.string().required(t('Please_enter_this_field')).nullable(),
    note: Yup.string().required(t('Please_enter_this_field')).nullable(),
  });

  const formControl = useFormik<TPatient>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPatient) => {
      try {
        if (modalType === 'add') {
          const res = await accidentApi.createAcident(data);
          if (res.data.code) {
            onSuccess();
            onHide();
            formControl.resetForm();
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
        if (modalType === 'edit') {
          const res = await accidentApi.updateAcident(data);
          if (res.data.code) {
            onSuccess();
            onHide();
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
        onHide();
      } catch (error) {
        message.error(error);
      }
    },
  });
  const handleChange = (key: keyof TPatient, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  const handleResetForm = () => {
    formControl.resetForm();
  };
  const inputs: InputProps[] = [
    {
      name: 'patientId',
      key: 'patientId',
      label: t('patientId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientId', e.target.value);
      },
    },
    {
      name: 'facilityId',
      key: 'facilityId',
      label: t('facilityId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.facilityId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('facilityId', e.target.value);
      },
    },
    {
      name: 'patientHospitalId',
      key: 'patientHospitalId',
      label: t('patientHospitalId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientHospitalId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientHospitalId', e.target.value);
      },
    },
    {
      name: 'fullName',
      key: 'fullName',
      label: t('fullName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.fullName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fullName', e.target.value);
      },
    },
    {
      name: 'fullNameUnUnicode',
      key: 'fullNameUnUnicode',
      label: t('fullNameUnUnicode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.fullNameUnUnicode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fullNameUnUnicode', e.target.value);
      },
    },
    {
      name: 'gender',
      key: 'gender',
      label: t('gender'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.gender,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('gender', e.target.value);
      },
    },
    {
      name: 'genderText',
      key: 'genderText',
      label: t('genderText'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.genderText,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('genderText', e.target.value);
      },
    },
    {
      name: 'dob',
      key: 'dob',
      label: t('dob'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.dob,
      onChange: (_, dateString: string) => {
        handleChange('dob', dateString);
      },
    },
    {
      name: 'dobDD',
      key: 'dobDD',
      label: t('dobDD'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.dobDD,
      onChange: (_, dateString: string) => {
        handleChange('dobDD', dateString);
      },
    },
    {
      name: 'dobMM',
      key: 'dobMM',
      label: t('dobMM'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.dobMM,
      onChange: (_, dateString: string) => {
        handleChange('dobMM', dateString);
      },
    },
    {
      name: 'dobYYYY',
      key: 'dobYYYY',
      label: t('dobYYYY'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.dobYYYY,
      onChange: (_, dateString: string) => {
        handleChange('dobYYYY', dateString);
      },
    },

    {
      name: 'fullAddress',
      key: 'fullAddress',
      label: t('fullAddress'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.fullAddress,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fullAddress', e.target.value);
      },
    },
    {
      name: 'street',
      key: 'street',
      label: t('street'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.street,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('street', e.target.value);
      },
    },
    {
      name: 'countryId',
      key: 'countryId',
      label: t('countryId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.countryId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('countryId', e.target.value);
      },
    },
    {
      name: 'provinceId',
      key: 'provinceId',
      label: t('provinceId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.provinceId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('provinceId', e.target.value);
      },
    },
    {
      name: 'districtId',
      key: 'districtId',
      label: t('districtId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.districtId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('districtId', e.target.value);
      },
    },
    {
      name: 'wardId',
      key: 'wardId',
      label: t('wardId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.wardId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('wardId', e.target.value);
      },
    },
    {
      name: 'mobile',
      key: 'mobile',
      label: t('mobile'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.mobile,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('mobile', e.target.value);
      },
    },
    {
      name: 'mobile2',
      key: 'mobile2',
      label: t('mobile2'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.mobile2,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('mobile2', e.target.value);
      },
    },

    {
      name: 'vaccineCode',
      key: 'vaccineCode',
      label: t('vaccineCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.vaccineCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('vaccineCode', e.target.value);
      },
    },
    {
      name: 'patientPortalUsername',
      key: 'patientPortalUsername',
      label: t('patientPortalUsername'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientPortalUsername,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientPortalUsername', e.target.value);
      },
    },
    {
      name: 'patientPortalPassword',
      key: 'patientPortalPassword',
      label: t('patientPortalPassword'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientPortalPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientPortalPassword', e.target.value);
      },
    },
    {
      name: 'email',
      key: 'email',
      label: t('email'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('email', e.target.value);
      },
    },
    {
      name: 'birthCertificate',
      key: 'birthCertificate',
      label: t('birthCertificate'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.birthCertificate,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('birthCertificate', e.target.value);
      },
    },
    {
      name: 'idPassport',
      key: 'idPassport',
      label: t('idPassport'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.idPassport,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('idPassport', e.target.value);
      },
    },

    {
      name: 'note',
      key: 'note',
      label: t('note'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.note,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('note', e.target.value);
      },
    },
    {
      name: 'ethnicityId',
      key: 'ethnicityId',
      label: t('ethnicityId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.ethnicityId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('ethnicityId', e.target.value);
      },
    },
    {
      name: 'maritalStatus',
      key: 'maritalStatus',
      label: t('maritalStatus'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.maritalStatus,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maritalStatus', e.target.checked);
      },
    },
    {
      name: 'occupationId',
      key: 'occupationId',
      label: t('occupationId'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.occupationId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('occupationId', e.target.checked);
      },
    },
    {
      name: 'isNameless',
      key: 'isNameless',
      label: t('isNameless'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isNameless,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isNameless', e.target.checked);
      },
    },
    {
      name: 'isMerged',
      key: 'isMerged',
      label: t('isMerged'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isMerged,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isMerged', e.target.checked);
      },
    },
    {
      name: 'isDeleted',
      key: 'isDeleted',
      label: t('isDeleted'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isDeleted,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isDeleted', e.target.checked);
      },
    },
  ];

  useEffect(() => {
    if (modalType === 'edit' && selectedRecord) {
      handleResetForm();
      formControl.setValues(selectedRecord);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, selectedRecord]);

  return (
    <>
      <Modal
        open={modalType !== 'view' && isShow}
        onCancel={onHide}
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_room')
              : modalType === 'edit'
                ? t('Edit_room')
                : t('View_room')}
          </Typography.Title>
        }
        footer
        width={1200}
        height={200}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 48, lg: 4 }}
            gutter={[0, 8]}
          />

          <Flex justify='end' gap={12}>
            <Button onClick={onHide}>{t('cancel')}</Button>
            <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
              {t('Save')}
            </ButtonCustom.Edit>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default PatientModal;
