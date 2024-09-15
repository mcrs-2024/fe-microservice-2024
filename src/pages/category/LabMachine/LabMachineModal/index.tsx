// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { USER } from 'src/constants/dumb/medicineCategory';
import { ORGANIZATION } from 'src/constants/dumb/organization';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TChapter } from 'src/constants/types/category/chapter';
import {
  LabMachineModalType,
  TLabMachine,
} from 'src/constants/types/category/labMachine';
import chapterApi from 'src/helpers/api/category/chapterApi';
import labMachineApi from 'src/helpers/api/category/labMachine';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: LabMachineModalType;
  selectedRecord: TLabMachine | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TLabMachine = {
  labMachineId: '',
  labMachineName: '',
  labMachineTypeCode: '',
  serialNumber: '',
  labMachineCode: '',
  buySourceCode: '',
  employeeRunningMachine: '',
};

const LabMachineModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    labMachineName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('max_length_exceeded'))
      .nullable(),
    labMachineTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('max_length_exceeded'))
      .nullable(),
    serialNumber: Yup.string()
      .required(t('please_enter_required_field'))
      .max(120, t('max_length_exceeded'))
      .nullable(),
    labMachineCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('max_length_exceeded'))
      .nullable(),
    buySourceCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('max_length_exceeded'))
      .nullable(),
  });
  const formControl = useFormik<TLabMachine>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TLabMachine) => {
      try {
        if (modalType === 'add') {
          const res = await labMachineApi.createLabMachine(data);
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
          const res = await labMachineApi.updateLabMachine(data);
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
  const handleChange = (key: keyof TLabMachine, value: any) => {
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
      label: t('Test_type_machine'), // loại máy xét nghiệm
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineTypeCode', e.target.value);
      },
    },
    {
      name: 'labMachineCode ',
      key: 'labMachineCode ',
      label: t('Testing_machine_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineCode', e.target.value);
      },
    },
    {
      name: 'labMachineName',
      key: 'labMachineName',
      label: t('test_machine_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineName', e.target.value);
      },
    },
    {
      name: 'buySourceCode',
      key: 'buySourceCode',
      label: t('Funding'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.buySourceCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('buySourceCode', e.target.value);
      },
    },
    {
      name: 'serialNumber',
      key: 'serialNumber',
      label: t('Số serial'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.serialNumber,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('serialNumber', e.target.value);
      },
    },
    {
      name: 'employeeRunningMachine',
      key: 'employeeRunningMachine',
      label: t('employeeRunningMachine'),
      type: TYPE_FIELD.SELECT,
      options: USER,
      value: formControl.values.employeeRunningMachine,
      onChange: (input: string | string[]) => {
        let valuesArray: string[] = [];

        if (typeof input === 'string') {
          // Check if the string is in the format "{value1,value2}"
          if (input.startsWith('{') && input.endsWith('}')) {
            // Convert the string back into an array
            valuesArray = input
              .slice(1, -1)
              .split(',')
              .map(item => item.trim());
          } else {
            console.error('Unexpected string format:', input);
          }
        } else if (Array.isArray(input)) {
          valuesArray = input;
        } else {
          console.error('Expected an array or a string, but got:', input);
        }

        const stringValue =
          valuesArray.length > 0 ? `{${valuesArray.join(',')}}` : '';
        handleChange('employeeRunningMachine', stringValue);
      },
      isMultiple: true,
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
  console.log('dâtta', formControl.values);

  return (
    <>
      <Modal
        open={modalType !== 'view' && isShow}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_testing_machine')
              : modalType === 'edit'
                ? t('Edit_testing_machine')
                : t('View_testing_machine')}
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

export default LabMachineModal;
