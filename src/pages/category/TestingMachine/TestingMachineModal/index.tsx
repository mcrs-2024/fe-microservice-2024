// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { CHAPTER_STATUS_OPTIONS } from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TestingMachineModalType,
  TTestingMachine,
} from 'src/constants/types/category/testingMachine';
import chapterApi from 'src/helpers/api/category/chapterApi';
import testingMachineApi from 'src/helpers/api/category/testingMachine';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: TestingMachineModalType;
  selectedRecord: TTestingMachine | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TTestingMachine = {
  labMachineTypeCode: '',
  labMachineTypeName: '',
};

const TestingMachineModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    labMachineTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('max_length_exceeded'))
      .nullable(),

    labMachineTypeName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('max_length_exceeded')),
  });
  const formControl = useFormik<TTestingMachine>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TTestingMachine) => {
      try {
        if (modalType === 'add') {
          const res = await testingMachineApi.createTestingMachine(data);
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
          const res = await testingMachineApi.updateTestingMachine(data);
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
  const handleChange = (key: keyof TTestingMachine, value: any) => {
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
      name: 'labMachineTypeCode',
      key: 'labMachineTypeCode',
      label: t('Type_of_testing_machine'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.labMachineTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineTypeCode', e.target.value);
      },
    },
    {
      name: 'labMachineTypeName',
      key: 'labMachineTypeName',
      label: t('Name_the_type_of_testing_machine'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineTypeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineTypeName', e.target.value);
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
              ? t('Add_Type_of_testing_machine')
              : modalType === 'edit'
                ? t('Edit_Type_of_testing_machine')
                : t('View_Type_of_testing_machine')}
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

export default TestingMachineModal;
