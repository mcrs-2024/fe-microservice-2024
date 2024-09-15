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
import {
  CategoryMedicalRecordModalType,
  TMedicalRecord,
} from 'src/constants/types/category/medicalRecord';
import { useGetAllRoles } from 'src/helpers/api/admin/role';
// import userApi from 'src/helpers/api/admin/user';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddGroupMedicalRecordProps {
  show: boolean;
  modalType: CategoryMedicalRecordModalType;
  category: TMedicalRecord | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      sst: string;
      label: string;
      Specialist: string;
      PrivateUse: string;
    }
  | TMedicalRecord;

const defaultValue: FormValues = {
  sst: '',
  label: '',
  Specialist: '',
  PrivateUse: '',
};

const GroupRecordModal = ({
  show,
  modalType,
  onHide,
  category,
  onSuccess,
}: AddGroupMedicalRecordProps) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const formSchema = yupObject({
    label: Yup.string()
      .min(6, t('Too_short'))
      .max(50, t('Too_long'))
      .nullable(),
    Specialist: Yup.string()
      .min(6, t('Too_short'))
      .max(50, t('Too_long'))
      .nullable(),
    PrivateUse: Yup.string()
      .min(10, t('Too_short'))
      .max(10, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {},
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
      name: 'label',
      key: 'label',
      label: t('label'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.label,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('label', e.target.value);
      },
    },
    {
      name: 'Specialist',
      key: 'Specialist',
      label: t('Specialist'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.Specialist,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('Specialist', e.target.value);
      },
    },
    {
      name: 'PrivateUse',
      key: 'PrivateUse',
      label: t('PrivateUse'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.PrivateUse,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('PrivateUse', e.target.value);
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
              ? t('Add_medical_file_template')
              : modalType === 'edit'
                ? t('Edit_medical_file_template')
                : t('VIEW_medical_file_template')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical'>
          <InputFields inputs={inputs} form={formControl} gutter={[0, 6]} />

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

export default GroupRecordModal;
