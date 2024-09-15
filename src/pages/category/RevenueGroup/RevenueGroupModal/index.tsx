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
  RevenueGroupsModalType,
  TRevenueGroups,
} from 'src/constants/types/category/revenueGroups';
import revenueGroupApi from 'src/helpers/api/category/revenueGroups';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: RevenueGroupsModalType;
  selectedRecord: TRevenueGroups | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TRevenueGroups = {
  id: null,
  itemGroupRevenueCode: null,
  itemGroupRevenueRefName: null,
};

const RevenueGroupsModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    itemGroupRevenueCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    itemGroupRevenueRefName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });
  const formControl = useFormik<TRevenueGroups>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TRevenueGroups) => {
      try {
        if (modalType === 'add') {
          const res = await revenueGroupApi.createRevenueGroup(data);
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
          const res = await revenueGroupApi.updateRevenueGroup(data);
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
  const handleChange = (key: keyof TRevenueGroups, value: any) => {
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
      name: 'itemGroupRevenueCode',
      key: 'itemGroupRevenueCode',
      label: t('Revenue_group_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.itemGroupRevenueCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('itemGroupRevenueCode', e.target.value);
      },
    },
    {
      name: 'itemGroupRevenueRefName',
      key: 'itemGroupRevenueRefName',
      label: t('Revenue_group_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.itemGroupRevenueRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('itemGroupRevenueRefName', e.target.value);
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
              ? t('Add_revenue_group')
              : modalType === 'edit'
                ? t('Edit_revenue_group')
                : t('View_revenue_group')}
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

export default RevenueGroupsModal;
