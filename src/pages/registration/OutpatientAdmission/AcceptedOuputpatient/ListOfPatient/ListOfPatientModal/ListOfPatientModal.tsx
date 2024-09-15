// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { GENDER } from 'src/constants/dumb/registration';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  ListOfPatientModalType,
  TListOfPatient,
} from 'src/constants/types/registration/listOfPatient';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: ListOfPatientModalType;
  selectedRecord: TListOfPatient | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TListOfPatient = {
  id: null,
  patientName: null,
  patientAge: null,
  patientGender: null,
};

const ListOfPatientModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    patientName: Yup.string().required().nullable(),
    patientAge: Yup.string().required().nullable(),
    patientGender: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TListOfPatient>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TListOfPatient) => {
      // try {
      //   if (modalType === 'add') {
      //     const res = await chapterApi.createChapter(data);
      //     if (res.data.code) {
      //       onSuccess();
      //       formControl.resetForm();
      //       message.success(res.data.message);
      //     } else {
      //       message.error(res.data.message);
      //     }
      //   }
      //   if (modalType === 'edit') {
      //     const res = await chapterApi.updateChapter(data);
      //     if (res.data.code) {
      //       onSuccess();
      //       message.success(res.data.message);
      //     } else {
      //       message.error(res.data.message);
      //     }
      //   }
      //   onHide();
      // } catch (error) {
      //   message.error(error);
      // }
    },
  });
  const handleChange = (key: keyof TListOfPatient, value: any) => {
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
      name: 'patientName',
      key: 'patientName',
      label: t('patientName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientName', e.target.value);
      },
    },
    {
      name: 'patientAge',
      key: 'patientAge',
      label: t('patientAge'),
      type: TYPE_FIELD.INPUT_NUMBER,
      value: formControl.values.patientAge,
      onChange: (value: number) => {
        handleChange('patientAge', value);
      },
    },
    {
      name: 'patientGender',
      key: 'patientGender',
      label: t('patientGender'),
      type: TYPE_FIELD.SELECT,
      options: GENDER,
      value: formControl.values.patientGender,
      onChange: (value: number) => {
        handleChange('patientGender', value);
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
        open={isShow}
        onCancel={onHide}
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_patient_information')
              : modalType === 'edit'
                ? t('Edit_patient_information')
                : t('View_patient_information')}
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

export default ListOfPatientModal;
