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
  ICDTypeModalType,
  TICDType,
} from 'src/constants/types/category/icdType';
import { useGetAllRoles } from 'src/helpers';
import icdTypeAPI from 'src/helpers/api/category/ICDType';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddGroupICDProps {
  show: boolean;
  modalType: ICDTypeModalType;
  selectedRecord: TICDType | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      id: string | null;
      icdTypeCode: string | null;
      icdTypeName: string | null;
      seqNum: number | null;
    }
  | TICDType;

const defaultValue: FormValues = {
  id: '',
  icdTypeCode: '',
  icdTypeName: '',
  seqNum: null,
};

const TypeICDModal = ({
  show,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: AddGroupICDProps) => {
  const { t } = useTranslation();

  const formSchema = yupObject({
    icdTypeCode: Yup.string().required(t('Please_enter_this_field')).nullable(),
    icdTypeName: Yup.string().required(t('Please_enter_this_field')).nullable(),
  });
  const formControl = useFormik<TICDType>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TICDType) => {
      try {
        if (modalType === 'add') {
          const res = await icdTypeAPI.createICDType(data);
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
          const res = await icdTypeAPI.updateICDType(data);
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
      name: 'icdTypeCode',
      key: 'icdTypeCode',
      label: t('Type_Code'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.icdTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdTypeCode', e.target.value);
      },
    },
    {
      name: 'icdTypeName',
      key: 'icdTypeName',
      label: t('Type_Name'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.icdTypeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdTypeName', e.target.value);
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
        open={modalType !== 'view' && show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_Type_ICD')
              : modalType === 'edit'
                ? t('Edit_Type_ICD')
                : t('View_Type_ICD')}
          </Typography.Title>
        }
        footer
        width={400}
      >
        <Space direction='vertical'>
          <InputFields inputs={inputs} form={formControl} />

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

export default TypeICDModal;
