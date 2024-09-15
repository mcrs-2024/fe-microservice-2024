import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Flex,
  message,
  Modal,
  Space,
  Typography,
  UploadFile,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  FacilityModalType,
  TFacility,
} from 'src/constants/types/category/facilities';
import facilitiesApi from 'src/helpers/api/category/facilities';
import ProvinceApi from 'src/helpers/api/category/province';
import { getDataURI } from 'src/utils/image';
import { isPhoneNumber, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: FacilityModalType;
  selectedRecord: TFacility | null;
  onHide: () => void;
  onSuccess: () => void;
}
type FormValues =
  | {
      id: '';
      customerCode: '';
      facilityCode: '';
      healthcareFacilityCode: '';
      facilityFullName: '';
      facilityFullNameUnUnicode: '';
      facilityShortName: '';
      prefixName: '';
      managementAuthority: '';
      higherAuthorityName: '';
      higherAuthorityShortName: '';
      hospitalClass: null;
      customerNote: '';
      customerAddress: '';
      provinceCode: '';
      districtCode: '';
      wardCode: '';
      telephone: '';
      telephoneSecond: '';
      hotline: '';
      email: '';
      website: '';
      fax: '';
      tax: '';
      pharmacyTax: '';
      isActived: false;
      logo: '';
      logoHeader: '';
      watermark: '';
      insuranceUsername: '';
      insurancePassword: '';
      vaccineGateUsername: '';
      vaccineGatePassword: '';
      nationalPharmacyCode: '';
      representative: '';
      position: '';
      haveInsurance: false;
      smsAllow: false;
      seqNum: null;
    }
  | TFacility;

const defaultValue: FormValues = {
  id: '',
  customerCode: '',
  facilityCode: '',
  healthcareFacilityCode: '',
  facilityFullName: '',
  facilityFullNameUnUnicode: '',
  facilityShortName: '',
  prefixName: '',
  managementAuthority: '',
  higherAuthorityName: '',
  higherAuthorityShortName: '',
  hospitalClass: null,
  customerNote: '',
  customerAddress: '',
  provinceCode: '',
  districtCode: '',
  wardCode: '',
  telephone: '',
  telephoneSecond: '',
  hotline: '',
  email: '',
  website: '',
  fax: '',
  tax: '',
  pharmacyTax: '',
  isActived: false,
  logo: '',
  logoHeader: '',
  watermark: '',
  insuranceUsername: '',
  insurancePassword: '',
  vaccineGateUsername: '',
  vaccineGatePassword: '',
  nationalPharmacyCode: '',
  representative: '',
  position: '',
  haveInsurance: false,
  smsAllow: false,
  seqNum: null,
};

const FacilitiesModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    id: Yup.string().required().nullable(),
    customerCode: Yup.string().required().nullable(),
    facilityCode: Yup.string().required().nullable(),
    healthcareFacilityCode: Yup.string().required().nullable(),
    facilityFullName: Yup.string().required().nullable(),
    managementAuthority: Yup.string().required().nullable(),
    higherAuthorityName: Yup.string().required().nullable(),
    hospitalClass: Yup.string().required().nullable(),
    customerNote: Yup.string().required().nullable(),
    customerAddress: Yup.string().required().nullable(),
    provinceCode: Yup.string().required().nullable(),
    districtCode: Yup.string().required().nullable(),
    wardCode: Yup.string().required().nullable(),
    telephone: Yup.string().required().nullable(),
    telephoneSecond: Yup.string().required().nullable(),
    hotline: Yup.string().required().nullable(),
    email: Yup.string().required().nullable(),
    website: Yup.string().required().nullable(),
    fax: Yup.string().required().nullable(),
    tax: Yup.string().required().nullable(),
    pharmacyTax: Yup.string().required().nullable(),
    logo: Yup.string().required().nullable(),
    logoHeader: Yup.string().required().nullable(),
    watermark: Yup.string().required().nullable(),
    insuranceUsername: Yup.string().required().nullable(),
    insurancePassword: Yup.string().required().nullable(),
    vaccineGateUsername: Yup.string().required().nullable(),
    vaccineGatePassword: Yup.string().required().nullable(),
    nationalPharmacyCode: Yup.string().required().nullable(),
    representative: Yup.string().required().nullable(),
    position: Yup.string().required().nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      try {
        if (modalType === 'add') {
          const res = await facilitiesApi.createFacilities(data);
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
          const res = await facilitiesApi.updateFacilities(data);
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
  const handleChange = (key: keyof FormValues, value: any) => {
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
      name: 'customerCode',
      label: t('customerCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.customerCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('customerCode', e.target.value);
      },
    },
    {
      name: 'facilityCode',
      label: t('facilityID'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.facilityCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('facilityCode', e.target.value);
      },
    },
    {
      name: 'healthcareFacilityCode',
      label: t('healthcareFacilityCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.healthcareFacilityCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('healthcareFacilityCode', e.target.value);
      },
    },
    {
      name: 'facilityFullName',
      label: t('facilityFullName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.facilityFullName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('facilityFullName', e.target.value);
      },
    },
    {
      name: 'managementAuthority',
      label: t('managementAuthority'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.managementAuthority,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('managementAuthority', e.target.value);
      },
    },
    {
      name: 'higherAuthorityName',
      label: t('higherAuthorityName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.higherAuthorityName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('higherAuthorityName', e.target.value);
      },
    },
    {
      name: 'hospitalClass',
      label: t('hospitalClass'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.hospitalClass,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hospitalClass', e.target.value);
      },
    },
    {
      name: 'customerNote',
      label: t('customerNote'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.customerNote,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('customerNote', e.target.value);
      },
    },
    {
      name: 'customerAddress',
      label: t('customerAddress'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.customerAddress,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('customerAddress', e.target.value);
      },
    },
    {
      name: 'provinceCode',
      label: t('provinceID'),
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.provinceCode,
      onChange: (value: string) => {
        handleChange('provinceCode', value);
      },
    },
    {
      name: 'districtCode',
      label: t('districtID'),
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.districtCode,
      onChange: (value: string) => {
        handleChange('districtCode', value);
      },
    },
    {
      name: 'wardCode',
      label: t('wardID'),
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.wardCode,
      onChange: (value: string) => {
        handleChange('wardCode', value);
      },
    },
    {
      name: 'telephone',
      label: t('telephone'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.telephone,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('telephone', e.target.value);
      },
    },
    {
      name: 'telephoneSecond',
      label: t('telephone2'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.telephoneSecond,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('telephoneSecond', e.target.value);
      },
    },
    {
      name: 'hotline',
      label: t('hotline'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.hotline,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hotline', e.target.value);
      },
    },
    {
      name: 'email',
      label: t('email'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('email', e.target.value);
      },
    },
    {
      name: 'website',
      label: t('website'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.website,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('website', e.target.value);
      },
    },
    {
      name: 'fax',
      label: t('fax'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.fax,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fax', e.target.value);
      },
    },
    {
      name: 'tax',
      label: t('tax'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tax,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tax', e.target.value);
      },
    },
    {
      name: 'tax',
      label: t('tax'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tax,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tax', e.target.value);
      },
    },
    {
      name: 'pharmacyTax',
      label: t('pharmacyTax'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.pharmacyTax,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('pharmacyTax', e.target.value);
      },
    },
    {
      name: 'insuranceUsername',
      label: t('insuranceUsername'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.insuranceUsername,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('insuranceUsername', e.target.value);
      },
    },
    {
      name: 'insurancePassword',
      label: t('insurancePassword'),
      type: TYPE_FIELD.PASSWORD,
      value: formControl.values.insurancePassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('insurancePassword', e.target.value);
      },
    },
    {
      name: 'vaccineGateUsername',
      label: t('vaccineGateUsername'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.vaccineGateUsername,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('vaccineGateUsername', e.target.value);
      },
    },
    {
      name: 'vaccineGatePassword',
      label: t('vaccineGatePassword'),
      type: TYPE_FIELD.PASSWORD,
      allowClear: true,
      value: formControl.values.vaccineGatePassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('vaccineGatePassword', e.target.value);
      },
    },
    {
      name: 'nationalPharmacyCode',
      label: t('nationalPharmacyCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.nationalPharmacyCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nationalPharmacyCode', e.target.value);
      },
    },
    {
      name: 'representative',
      label: t('representative'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.representative,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('representative', e.target.value);
      },
    },
    {
      name: 'position',
      label: t('position'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.position,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('position', e.target.value);
      },
    },
    {
      name: 'haveInsurance',
      label: t('haveInsurance'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.haveInsurance,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('haveInsurance', e.target.checked);
      },
    },
    {
      name: 'logo',
      label: t('logo'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.logo,
      fileSize: 4,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
        handleChange('logo', dataURI);
      },
      maxCount: 1,
    },
    {
      name: 'logoHeader',
      label: t('logoHeader'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.logoHeader,
      fileSize: 4,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
        handleChange('logoHeader', dataURI);
      },
      maxCount: 1,
    },
    {
      name: 'watermark',
      label: t('watermark'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.watermark,
      fileSize: 4,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
        handleChange('watermark', dataURI);
      },
      maxCount: 1,
    },
    {
      name: 'smsAllow',
      label: t('smsAllow'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.smsAllow,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('smsAllow', e.target.checked);
      },
    },
    {
      name: 'isActived',
      label: t('isActived'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isActived,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isActived', e.target.checked);
      },
    },
    // {
    //   name: 'imageUrl',
    //   label: t('image'),
    //   type: TYPE_FIELD.FILE,
    //   disabled: isDisable,
    //   value: formControl.values.imageUrl,
    //   fileSize: 4,
    //   accept: 'image/*',
    //   onChange: async (files: UploadFile[]) => {
    //     const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
    //     handleChange('imageUrl', dataURI);
    //   },
    //   maxCount: 1,
    // },
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
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add facility')
              : modalType === 'edit'
                ? t('Edit facility')
                : t('View facility')}
          </Typography.Title>
        }
        footer
        width={1000}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 48, lg: 6 }}
            gutter={[0, 6]}
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

export default FacilitiesModal;
