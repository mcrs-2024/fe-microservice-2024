import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import {
  CITY,
  DISTRICT,
  IS_GENERAL_HOSPITAL,
} from 'src/constants/dumb/registration';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TProvince } from 'src/constants/types/category/Province';
import {
  RegistrationModalType,
  TRegistration,
} from 'src/constants/types/category/registration';
import ProvinceApi from 'src/helpers/api/category/province';
import registrationApi from 'src/helpers/api/category/registration';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: RegistrationModalType;
  selectedRecord: TRegistration | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TRegistration = {
  medicalCode: null,
  medicalName: null,
  seqNum: null,
  address: null,
  glandCode: null,
};

const RegistrationModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const [provinces, setProvinces] = useState<TProvince[]>([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ProvinceApi.getProvinces();
        setProvinces(
          response.data.data.map((province: TProvince) => ({
            label: province.fullName,
            value: province.code,
          })),
        );
        if (!response.data.code) {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await ProvinceApi.getDistricts(provinceCode);
      setDistricts(
        response.data.data.map((district: any) => ({
          label: district.fullName,
          value: district.code,
        })),
      );
      if (!response.data.code) {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formSchema = yupObject({
    // medicalCode: Yup.string().required().nullable(),
    // medicalName: Yup.string().required().nullable(),
    // seqNum: Yup.string().required().nullable(),
    // address: Yup.string().required().nullable(),
    // glandCode: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TRegistration>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TRegistration) => {
      try {
        if (modalType === 'add') {
          const res = await registrationApi.createRegistration(data);
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
          const res = await registrationApi.updateRegistration(data);
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
  const handleChange = (key: keyof TRegistration, value: any) => {
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
      name: 'medicalCode',
      key: 'medicalCode',
      label: t('Registration Place'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.medicalCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('medicalCode', e.target.value);
      },
    },
    {
      name: 'medicalName',
      key: 'medicalName',
      label: t('Registration Serial Number'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.medicalName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('medicalName', e.target.value);
      },
    },
    {
      name: 'address',
      key: 'address',
      label: t('Registration name'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.address,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('address', e.target.value);
      },
    },
    {
      name: 'glandCode',
      key: 'glandCode',
      label: t('Registration Address'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.glandCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('glandCode', e.target.value);
      },
    },
  ];
  useEffect(() => {
    if (formControl.values.registrationCity) {
      fetchDistricts(formControl.values.registrationCity);
      formControl.setValues({
        ...formControl.values,
        registrationDistrict: '',
      });
    } else {
      setDistricts([]);
    }
  }, [formControl.values.registrationCity]);
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
              ? t('Add Registration')
              : modalType === 'edit'
                ? t('Edit Registration')
                : t('View Registration')}
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

export default RegistrationModal;
