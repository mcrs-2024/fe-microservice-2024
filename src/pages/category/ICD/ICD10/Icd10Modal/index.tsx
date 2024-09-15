// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TCategory } from 'src/constants/types';
import { TBlockICD } from 'src/constants/types/category/blockICD';
import { Icd10ModalType, TIcd10 } from 'src/constants/types/category/ICD10';
import { useGetAllBlockIDC } from 'src/helpers/api/category/blockICD';
import icd10Api from 'src/helpers/api/category/icd10';
import { useGetAllGroupICD } from 'src/helpers/api/categoryGroupICD/categoryGroupICD';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: Icd10ModalType;
  selectedRecord: TIcd10 | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TIcd10 = {
  id: '',
  icdCode: '',
  icdNameE: '',
  icdNameV: '',
  icdBlocksId: '',
  icdGroupId: null,
  icd10Mapping: '',
  seqNum: null,
  billable: false,
};

const Icd10Modal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: blockICD } = useGetAllBlockIDC();

  const formSchema = yupObject({
    icdCode: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TIcd10>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TIcd10) => {
      try {
        if (modalType === 'add') {
          const res = await icd10Api.createIcd10(data);
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
          const res = await icd10Api.updateIcd10(data);
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
  const handleChange = (key: keyof TIcd10, value: any) => {
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
      name: 'icdCode',
      key: 'icdCode',
      label: t('ICD10_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.icdCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdCode', e.target.value);
      },
    },
    {
      name: 'icdName', //tên bẹnh
      key: 'icdName',
      label: t('Desease_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: {
        vn: formControl.values.icdNameV,
        en: formControl.values.icdNameE,
      },
      onChange: (e: { target: { value: { vn: string; en: string } } }) => {
        formControl.setValues({
          ...formControl.values,
          icdNameV: e.target.value.vn,
          icdNameE: e.target.value.en,
        });
      },
      showLanguageToggle: true,
    },
    {
      name: 'icdBlocksId',
      key: 'icdBlocksId',
      label: t('Parent_ICD10_code'),
      type: TYPE_FIELD.SELECT,
      options: blockICD?.data?.map((blockICDs: TBlockICD) => ({
        value: blockICDs.id ?? null,
        label: blockICDs.icdBlocksName ?? null,
      })),
      disabled: isDisable,
      value: formControl.values.icdBlocksId,
      onChange: (value: string) => {
        handleChange('icdBlocksId', value);
      },
    },
    {
      name: 'icd10Mapping', // mã ICD10
      key: 'icd10Mapping',
      label: t('ICD10_Mapping'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.icd10Mapping,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icd10Mapping', e.target.value);
      },
    },
    {
      name: 'billable',
      key: 'billable',
      label: t('billable'),
      type: TYPE_FIELD.CHECKBOX,
      disabled: isDisable,
      value: formControl.values.billable,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('billable', e.target.checked);
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
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_ICD10')
              : modalType === 'edit'
                ? t('Edit_ICD10')
                : t('View_ICD10')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields inputs={inputs} form={formControl} span={{ sm: 24 }} />

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

export default Icd10Modal;
