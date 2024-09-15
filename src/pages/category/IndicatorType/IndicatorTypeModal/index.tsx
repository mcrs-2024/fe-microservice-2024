// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Flex,
  message,
  Modal,
  Space,
  Typography,
  UploadFile,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { CHAPTER_STATUS_OPTIONS } from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { CategoryModalType } from 'src/constants/types';
import { TChapter } from 'src/constants/types/category/chapter';
import chapterApi from 'src/helpers/api/category/chapterApi';
import indicatorTypeApi from 'src/helpers/api/category/indicatorTypeApi';
import { getDataURI } from 'src/utils/image';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CategoryModalType;
  selectedRecord: TChapter | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TChapter = {
  id: null,
  personIndicatorTypeCode: '',
  personIndicatorName: '',
  personIndicatorCode: '',
  iconImage: null,
};

const IndicatorTypeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    personIndicatorTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    personIndicatorCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    personIndicatorName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TChapter>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TChapter) => {
      try {
        if (modalType === 'add') {
          const res = await indicatorTypeApi.createIndicatorType(data);
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
          const res = await indicatorTypeApi.updateIndicatorType(data);
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
  const handleChange = (key: keyof TChapter, value: any) => {
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
      name: 'personIndicatorCode',
      key: 'personIndicatorCode',
      label: t('Person_indicator_record'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.personIndicatorCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('personIndicatorCode', e.target.value);
      },
    },
    {
      name: 'personIndicatorTypeCode',
      key: 'personIndicatorTypeCode',
      label: t('Person_indicator_type_reference_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.personIndicatorTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('personIndicatorTypeCode', e.target.value);
      },
    },
    {
      name: 'personIndicatorName',
      key: 'personIndicatorName',
      label: t('Person_indicator_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.personIndicatorName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('personIndicatorName', e.target.value);
      },
    },
    {
      name: 'iconImage',
      key: 'iconImage',
      label: t('icon'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.iconImage,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const file = files[0]?.originFileObj as RcFile;
        if (file) {
          // Chuyển đổi file thành Base64
          const dataURI = await getDataURI(file);

          // Giới hạn Base64 chỉ còn 60 ký tự
          const shortDataURI = dataURI.substring(0, 60);

          // Lưu chuỗi Base64 rút gọn này
          handleChange('iconImage', shortDataURI);
        }
      },
      maxCount: 1,
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
              ? t('add_person_indicator')
              : modalType === 'edit'
                ? t('edit_person_indicator')
                : t('view_person_indicator')}
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

export default IndicatorTypeModal;
