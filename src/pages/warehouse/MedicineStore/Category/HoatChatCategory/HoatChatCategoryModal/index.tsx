import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  THoatChatCategory,
  THoatChatCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import hoatChatCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/hoatChatCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';
interface AddHoatChatCategory {
  show: boolean;
  modalType: THoatChatCategoryModal;
  HoatChatCategory: THoatChatCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: THoatChatCategory = {
  id: null,
  maHoatChat: null,
  tenHoatChat: '',
  tuongTac: '',
  moTa: '',
  createdBy: '',
};

const HoatChatCategoryModal = ({
  show,
  modalType,
  HoatChatCategory,
  onHide,
  onSuccess,
}: AddHoatChatCategory) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();

  const formSchema = yupObject({
    maHoatChat: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please enter active ingredient code'))
      .nullable(),
    tenHoatChat: Yup.string()
      .required(t('Please enter active ingredient name'))
      .nullable(),
    tuongTac: Yup.string().required(t('Please enter interaction')).nullable(),
    moTa: Yup.string().required(t('Please enter description')).nullable(),
    createdBy: Yup.string().required(t('Please enter creator')).nullable(),
  });
  const formControl = useFormik<THoatChatCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: THoatChatCategory) => {
      try {
        if (modalType === 'edit') {
          const res = await hoatChatCategoryApi.updateHoatChat(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await hoatChatCategoryApi.createHoatChat(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleChange = (key: keyof THoatChatCategory, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  useEffect(() => {
    if (modalType === 'edit' && HoatChatCategory) {
      formControl.setValues(HoatChatCategory);
    }
    if (modalType === 'add' && HoatChatCategory) {
      //
    }
  }, [modalType, HoatChatCategory]);
  const inputs: InputProps[] = [
    // {
    //   label: 'ID',
    //   name: 'id',
    //   key: 'id',
    //   type: TYPE_FIELD.TEXT,
    //   value: formControl.values.id,
    //   disabled: isDisable || modalType === 'add',
    //   onChange: (e: ChangeEvent<HTMLInputElement>) => {
    //     handleChange('id', e.target.value);
    //   },
    // },
    {
      label: t('Active_Ingredient_ID'),
      name: 'maHoatChat',
      key: 'maHoatChat',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.maHoatChat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maHoatChat', e.target.value);
      },
    },
    {
      label: t('Interaction'),
      name: 'tuongTac',
      key: 'tuongTac',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tuongTac,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tuongTac', e.target.value);
      },
    },
    {
      label: t('description'),
      name: 'moTa',
      key: 'moTa',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.moTa,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moTa', e.target.value);
      },
    },
    {
      label: t('Created by'),
      name: 'createdBy',
      key: 'createdBy',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.createdBy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('createdBy', e.target.value);
      },
    },
    {
      label: t('Active_Ingredient_Name'),
      name: 'tenHoatChat',
      key: 'tenHoatChat',
      //disabled: isDisable || modalType === 'add',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tenHoatChat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenHoatChat', e.target.value);
      },
    },
  ];
  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? 'Thêm loại hoạt chất'
              : modalType === 'edit'
                ? 'Chỉnh sửa hoạt chất'
                : 'Xem hoạt chất'}
          </Typography.Title>
        }
        footer
        width={1000}
      >
        <Space direction='vertical' className='d-flex'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 8 }}
            gutter={[0, 6]}
          ></InputFields>
          <Flex justify='end' gap={12}>
            <Button onClick={onHide}>Cancel</Button>
            <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
              Save
            </ButtonCustom.Edit>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default HoatChatCategoryModal;
