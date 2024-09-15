// components
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
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { POSITION_OPTIONS } from 'src/constants/dumb/admin';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { CategoryModalType, TCategory, TOption } from 'src/constants/types';
import { TRole } from 'src/constants/types/admin/role';
import { useGetAllRoles } from 'src/helpers/api/admin/role';
import serviceConfigurationApi from 'src/helpers/api/category/serviceConfiguration';
// import userApi from 'src/helpers/api/admin/user';
import { getDataURI } from 'src/utils/image';
import { isPhoneNumber, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddGroupICDProps {
  show: boolean;
  modalType: CategoryModalType;
  category: TCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      id: string;
      visitTypeCode: string | null;
      clinicalSpecialtyId: string | null;
      serviceId: string | null;
      employeeId: string | null;
      departmentId: string | null;
      availableFlag: boolean | null;
      comment: string | null;
    }
  | TCategory;

const defaultValue: FormValues = {
  id: null,
  visitTypeCode: 'null',
  clinicalSpecialtyId: 'null',
  serviceId: 'null',
  employeeId: 'null',
  departmentId: 'null',
  availableFlag: false,
  comment: 'null',
};

const ServiceConfigurationModal = ({
  show,
  modalType,
  onHide,
  category,
  onSuccess,
}: AddGroupICDProps) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    visitTypeCode: Yup.string()
      .required(t('Please_enter_username'))
      .min(5, t('Too_short'))
      .max(35, t('Too_long'))
      .nullable(),
    clinicalSpecialtyId: Yup.string()
      .required(t('Please_enter_fullName'))
      .min(6, t('Too_short'))
      .max(50, t('Too_long'))
      .nullable(),
    serviceId: Yup.string()
      .required(t('Please_enter_email'))
      .email(t('Please_enter_valid_email'))
      .nullable(),
    employeeId: Yup.string()
      .required(t('Please_enter_phone_number'))
      .matches(/^[0-9]+$/, t('Must_be_only_digits_and_10_characters'))
      .min(10, t('Too_short'))
      .max(10, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      try {
        if (modalType === 'add') {
          const res =
            await serviceConfigurationApi.createServiceConfiguration(data);
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
          const res =
            await serviceConfigurationApi.updateServiceConfiguration(data);
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
      name: 'Category_Name',
      key: 'Category_Name',
      label: t('Category_Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.visitTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('visitTypeCode', e.target.value);
      },
    },
    {
      name: 'Specialty_name',
      key: 'Specialty_name',
      label: t('Specialty_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.code,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('code', e.target.value);
      },
    },
    {
      name: 'Type_of_exam',
      key: 'Type_of_exam',
      label: t('Type_of_exam'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.groupName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('groupName', e.target.value);
      },
    },
    {
      name: 'displayorder',
      key: 'displayorder',
      label: t('Department_TH'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.displayOrder,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('displayOrder', e.target.value);
      },
    },
    {
      name: 'displayorder',
      key: 'displayorder',
      label: t('Performer'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.displayOrder,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('displayOrder', e.target.value);
      },
    },
    {
      name: 'displayorder',
      key: 'displayorder',
      label: t('Order'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.displayOrder,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('displayOrder', e.target.value);
      },
    },
    {
      name: 'displayorder',
      key: 'displayorder',
      label: t('isActive'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.displayOrder,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('displayOrder', e.target.value);
      },
    },
    {
      name: 'displayorder',
      key: 'displayorder',
      label: t('Note_service_configuration'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.displayOrder,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('displayOrder', e.target.value);
      },
    },
  ];

  useEffect(() => {
    if (modalType === 'edit' && category) {
      handleResetForm();
      formControl.setValues(category);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, category]);

  return (
    <>
      <Modal
        open={modalType !== 'view' && show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_service_configuration')
              : modalType === 'edit'
                ? t('Edit_service_configuration')
                : t('View_service_configuration')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
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

export default ServiceConfigurationModal;
