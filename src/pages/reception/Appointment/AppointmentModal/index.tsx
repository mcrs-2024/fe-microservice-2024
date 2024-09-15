// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { CHAPTER_STATUS_OPTIONS } from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AppointmentModalType,
  TAppointment,
} from 'src/constants/types/reception/appointment';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AppointmentModalType;
  selectedRecord: TAppointment | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAppointment = {
  id: null,
  icdChapterCode: '',
  icdChapterNameV: '',
  hoatDong: 1,
};

const AppointmentModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    maChuong: Yup.string()
      .required(t('please_enter_required_field'))
      .min(4, t('Too_short'))
      .max(255, t('Too_long'))
      .nullable(),
    tenChuong: Yup.string()
      .required(t('please_enter_required_field'))
      .min(6, t('Too_short'))
      .max(255, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TAppointment>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAppointment) => {
      try {
        if (modalType === 'add') {
          const res = await chapterApi.createChapter(data);
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
          const res = await chapterApi.updateChapter(data);
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
  const handleChange = (key: keyof TAppointment, value: any) => {
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
      name: 'maChuong',
      key: 'maChuong',
      label: t('patient'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.maChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maChuong', e.target.value);
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('doctor_examines'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenChuong', e.target.value);
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('From_date'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('To_date'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('status'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenChuong', e.target.value);
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('Search_by'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenChuong', e.target.value);
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
              ? t('Add_appointment')
              : modalType === 'edit'
                ? t('Edit_appointment')
                : t('View_appointment')}
          </Typography.Title>
        }
        footer
        width={600}
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

export default AppointmentModal;
