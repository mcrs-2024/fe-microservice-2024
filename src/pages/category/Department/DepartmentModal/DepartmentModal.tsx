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
  CatDepartmentModalType,
  TDepartment,
  TTypeDepartment,
} from 'src/constants/types/category/department';
import { TFacility } from 'src/constants/types/category/facilities';
import departmentApi, {
  useGetAllTypeDepartments,
} from 'src/helpers/api/category/department';
import { useGetAllFacilities } from 'src/helpers/api/category/facilities';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CatDepartmentModalType;
  selectedRecord: TDepartment | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TDepartment = {
  id: '',
  facility: '',
  departmentNo: null,
  departmentType: '',
  departmentCode: '',
  departmentName: '',
  departmentNameUnUnicode: '',
  departmentNameEnglish: '',
  isSurgery: null,
  isActive: null,
  seqNum: null,
};

const DepartmentModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: departmentTypes } = useGetAllTypeDepartments();
  const { data: facilities } = useGetAllFacilities();

  const formSchema = yupObject({
    facility: Yup.string().required().nullable(),
    departmentType: Yup.string().required().nullable(),
    departmentCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    departmentName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
    departmentNameUnUnicode: Yup.string().required().nullable(),
    departmentNameEnglish: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TDepartment>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TDepartment) => {
      try {
        if (modalType === 'add') {
          const res = await departmentApi.createDepartment(data);
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
          const res = await departmentApi.updateDepartment(data);
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
  const handleChange = (key: keyof TDepartment, value: any) => {
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
      name: 'facility',
      key: 'facility',
      label: t('facilityID'),
      type: TYPE_FIELD.SELECT,
      options: facilities?.data?.map((data: TFacility) => ({
        value: data.id ?? null,
        label: data.facilityFullName ?? null,
      })),
      value: formControl.values.facility,
      onChange: (value: string) => {
        handleChange('facility', value);
      },
    },
    {
      name: 'departmentNo',
      key: 'departmentNo',
      label: t('areaNo'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.departmentNo,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('departmentNo', e.target.value);
      },
    },
    {
      name: 'departmentCode',
      key: 'departmentCode',
      label: t('areaCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.departmentCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('departmentCode', e.target.value);
      },
    },
    {
      name: 'departmentName',
      key: 'departmentName',
      label: t('areaName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.departmentName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('departmentName', e.target.value);
      },
    },
    {
      name: 'departmentType',
      key: 'departmentType',
      label: t('areaTypeId'),
      type: TYPE_FIELD.SELECT,
      options: departmentTypes?.data?.map((data: TTypeDepartment) => ({
        value: data.id ?? null,
        label: data.departmentTypeName ?? null,
      })),
      value: formControl.values.departmentType,
      onChange: (value: string) => {
        handleChange('departmentType', value);
      },
    },
    {
      name: 'isSurgery',
      key: 'isSurgery',
      label: t('areaIsSurgery'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isSurgery,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isSurgery', e.target.checked);
      },
    },
    {
      name: 'isActive',
      key: 'isActive',
      label: t('areaIsActive'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isActive,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isActive', e.target.checked);
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
              ? t('Add_department')
              : modalType === 'edit'
                ? t('Edit_department')
                : t('View_department')}
          </Typography.Title>
        }
        footer
        width={1000}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
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

export default DepartmentModal;
