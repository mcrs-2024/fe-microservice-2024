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
import { TDepartment } from 'src/constants/types/category/department';
import {
  TVehicles,
  VehiclesModalType,
} from 'src/constants/types/category/vehicles';
import chapterApi from 'src/helpers/api/category/chapterApi';
import vehicleApi, {
  useGetAllDepartment,
} from 'src/helpers/api/category/vehicle';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: VehiclesModalType;
  selectedRecord: TVehicles | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TVehicles = {
  id: null,
  carCode: null,
  licensePlates: null,
  department: null,
  comment: null,
  seqNum: null,
};

const VehiclesModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: departments } = useGetAllDepartment();

  const formSchema = yupObject({
    carCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    licensePlates: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    department: Yup.string().required(t('Please_select_this_field')).nullable(),
  });
  const formControl = useFormik<TVehicles>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TVehicles) => {
      try {
        if (modalType === 'add') {
          const res = await vehicleApi.createVehicle(data);
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
          const res = await vehicleApi.updateVehicle(data);
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
  const handleChange = (key: keyof TVehicles, value: any) => {
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
      name: 'carCode',
      key: 'carCode',
      label: t('Card_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.carCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('carCode', e.target.value);
      },
    },
    {
      name: 'department',
      key: 'department',
      label: t('Department_name'),
      type: TYPE_FIELD.SELECT,
      value: formControl.values.department,
      disabled: isDisable,
      options: departments?.data?.map((department: TDepartment) => ({
        value: department.id ?? null,
        label: department.departmentName ?? null,
      })),
      onChange: (value: string) => {
        handleChange('department', value);
      },
    },
    {
      name: 'licensePlates',
      key: 'licensePlates',
      label: t('License_plates'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.licensePlates,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('licensePlates', e.target.value);
      },
    },
    {
      name: 'comment',
      key: 'comment',
      label: t('Note'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.comment,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('comment', e.target.value);
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
              ? t('Add_car')
              : modalType === 'edit'
                ? t('Edit_car')
                : t('View_car')}
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

export default VehiclesModal;
