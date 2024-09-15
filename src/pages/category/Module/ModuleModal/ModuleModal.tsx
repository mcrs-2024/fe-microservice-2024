import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  CategoryModuleModalType,
  TCategoryModule,
} from 'src/constants/types/category/module';
import moduleApi from 'src/helpers/api/category/moduleApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CategoryModuleModalType;
  selectedRecord: TCategoryModule | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TCategoryModule = {
  moduleCode: '',
  description: '',
  moduleName: '',
  moduleUrl: '',
};

const CategoryModuleModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    moduleCode: Yup.string()
      .required(t('Enter function code'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    moduleName: Yup.string()
      .required(t('Enter function name'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
    moduleUrl: Yup.string().required(t('Enter module url')).nullable(),
  });
  const formControl = useFormik<TCategoryModule>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TCategoryModule) => {
      try {
        if (modalType === 'add') {
          const res = await moduleApi.createModule(data);
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
          const res = await moduleApi.updateModule(data);
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
  const handleChange = (key: keyof TCategoryModule, value: any) => {
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
      name: 'moduleCode',
      key: 'moduleCode',
      label: t('Function code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.moduleCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moduleCode', e.target.value);
      },
    },
    {
      name: 'moduleName',
      key: 'moduleName',
      label: t('Function name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.moduleName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moduleName', e.target.value);
      },
    },
    {
      name: 'moduleUrl',
      key: 'moduleUrl',
      label: t('Function url'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.moduleUrl,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moduleUrl', e.target.value);
      },
    },
    {
      name: 'description',
      key: 'description',
      label: t('Function description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.description,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
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
              ? t('Add function')
              : modalType === 'edit'
                ? t('Edit function')
                : t('View function')}
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

export default CategoryModuleModal;
