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
  ActiveIngredientModalType,
  TActiveIngredient,
  TGroupActiveIngredient,
} from 'src/constants/types/category/activeIngredient';
import activeIngredientApi, {
  useGetAllGroupActiveIngredient,
} from 'src/helpers/api/category/activeIngredient';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddActiveIngredient {
  show: boolean;
  modalType: ActiveIngredientModalType;
  selectedRecord: TActiveIngredient | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      id: string | null;
      interactionGroupId: string | null;
      drugActiveIngredientCode01: string | null;
      drugActiveIngredientName01: string | null;
      drugActiveIngredientCode02: string | null;
      drugActiveIngredientName02: string | null;
      levelCode: string | null;
      levelName: string | null;
      interactiveLaunch: string | null;
      mechanismConsequence: string | null;
      handlingManagement: string | null;
      referenceSource: string | null;
    }
  | TActiveIngredient;

const defaultValue: FormValues = {
  id: '',
  interactionGroupId: '',
  drugActiveIngredientCode01: '',
  drugActiveIngredientName01: '',
  drugActiveIngredientCode02: '',
  drugActiveIngredientName02: '',
  levelCode: '',
  levelName: '',
  interactiveLaunch: '',
  mechanismConsequence: '',
  handlingManagement: '',
  referenceSource: '',
};

const ActiveIngredientModal = ({
  show,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: AddActiveIngredient) => {
  const { t } = useTranslation();
  const { data: groupActiveIngredients } = useGetAllGroupActiveIngredient();

  const formSchema = yupObject({
    interactionGroupId: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_select_this_field'))
      .nullable(),
    drugActiveIngredientCode01: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    drugActiveIngredientName01: Yup.string()
      .max(150, t('Please_select_the_source_of_medicine'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    drugActiveIngredientCode02: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    drugActiveIngredientName02: Yup.string()
      .max(150, t('Please_select_the_source_of_medicine'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    levelCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    levelName: Yup.string()
      .max(150, t('Please_select_the_source_of_medicine'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    interactiveLaunch: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    mechanismConsequence: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    handlingManagement: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    referenceSource: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      try {
        if (modalType === 'add') {
          const res = await activeIngredientApi.createActiveIngredient(data);
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
          const res = await activeIngredientApi.updateActiveIngredient(data);
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
      name: 'interactionGroupId',
      key: 'interactionGroupId',
      label: t('Group Code'),
      type: TYPE_FIELD.SELECT,
      options: groupActiveIngredients?.data?.map(
        (groupActiveIngredient: TGroupActiveIngredient) => ({
          value: groupActiveIngredient.id ?? null,
          label: groupActiveIngredient.interactionGroupName ?? null,
        }),
      ),
      value: formControl.values.interactionGroupId,
      onChange: (value: string) => {
        handleChange('interactionGroupId', value);
      },
    },
    {
      name: 'drugActiveIngredientCode01',
      key: 'drugActiveIngredientCode01',
      label: t('drugActiveIngredientCode01'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.drugActiveIngredientCode01,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('drugActiveIngredientCode01', e.target.value);
      },
    },
    {
      name: 'drugActiveIngredientName01',
      key: 'drugActiveIngredientName01',
      label: t('drugActiveIngredientName01'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.drugActiveIngredientName01,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('drugActiveIngredientName01', e.target.value);
      },
    },
    {
      name: 'drugActiveIngredientCode02',
      key: 'drugActiveIngredientCode02',
      label: t('drugActiveIngredientCode02'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.drugActiveIngredientCode02,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('drugActiveIngredientCode02', e.target.value);
      },
    },
    {
      name: 'drugActiveIngredientName02',
      key: 'drugActiveIngredientName02',
      label: t('drugActiveIngredientName02'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.drugActiveIngredientName02,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('drugActiveIngredientName02', e.target.value);
      },
    },
    {
      name: 'levelCode',
      key: 'levelCode',
      label: t('levelCode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.levelCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('levelCode', e.target.value);
      },
    },
    {
      name: 'levelName',
      key: 'levelName',
      label: t('levelName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.levelName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('levelName', e.target.value);
      },
    },
    {
      name: 'interactiveLaunch',
      key: 'interactiveLaunch',
      label: t('interactiveLaunch'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.interactiveLaunch,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('interactiveLaunch', e.target.value);
      },
    },
    {
      name: 'mechanismConsequence',
      key: 'mechanismConsequence',
      label: t('mechanismConsequence'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.mechanismConsequence,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('mechanismConsequence', e.target.value);
      },
    },
    {
      name: 'handlingManagement',
      key: 'handlingManagement',
      label: t('handlingManagement'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.handlingManagement,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('handlingManagement', e.target.value);
      },
    },
    {
      name: 'referenceSource',
      key: 'referenceSource',
      label: t('referenceSource'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.referenceSource,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('referenceSource', e.target.value);
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
              ? t('Add_active_ingredient')
              : modalType === 'edit'
                ? t('Edit_active_ingredient')
                : t('View_active_ingredient')}
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

export default ActiveIngredientModal;
