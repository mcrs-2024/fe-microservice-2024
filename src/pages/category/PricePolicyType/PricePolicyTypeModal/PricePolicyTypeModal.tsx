import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TPolicyType } from 'src/constants/types/category/policyTypes';
import { TPricePolice } from 'src/constants/types/category/pricePolicies';
import {
  PricePolicyTypeModalType,
  TPricePolicyType,
} from 'src/constants/types/category/pricePolicyType';
import { useGetAllPolicyType } from 'src/helpers/api/category/policyTypeApi';
import { useGetAllPricePolicies } from 'src/helpers/api/category/PricePoliciesApi';
import policyPriceTypeApi from 'src/helpers/api/category/pricePolicyType';
import { useGetAllVisitTypeGroup } from 'src/helpers/api/category/visitTypeGroupCode';
import { transformToOptions } from 'src/utils';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PricePolicyTypeModalType;
  selectedRecord: TPricePolicyType | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPricePolicyType = {
  id: null,
  policyPriceTypeCode: null,
  policyPriceTypeGroupId: null,
  policyPriceTypeRefName: null,
  visitTypeGroupId: null,
};

const PricePolicyTypeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: pricePolicyGroup } = useGetAllPricePolicies();
  const { data: visitSources } = useGetAllVisitTypeGroup();
  const { data: typePrice } = useGetAllPolicyType();

  const formSchema = yupObject({
    policyPriceTypeCode: Yup.string().required().nullable(),
    policyPriceTypeGroupId: Yup.string().required().nullable(),
    policyPriceTypeRefName: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TPricePolicyType>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPricePolicyType) => {
      try {
        if (modalType === 'add') {
          const res = await policyPriceTypeApi.createPolicyPriceType(data);
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
          const res = await policyPriceTypeApi.updatePolicyPriceType(data);
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
  const handleChange = (key: keyof TPricePolicyType, value: any) => {
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
      name: 'policyPriceTypeCode',
      key: 'policyPriceTypeCode',
      label: t('pricePolicyTypeCode'),
      type: TYPE_FIELD.SELECT,
      options: typePrice?.data?.map((tPrice: TPolicyType) => ({
        value: tPrice.policyTypeId ?? null,
        label: tPrice.policyTypeRefName ?? null,
      })),
      value: formControl.values.pricePolicyTypeCode,
      onChange: (value: string) => {
        handleChange('policyPriceTypeCode', value);
      },
    },
    {
      label: t('pricePolicyTypeName'),
      name: 'policyPriceTypeRefName',
      key: 'policyPriceTypeRefName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.policyPriceTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('policyPriceTypeRefName', e.target.value);
      },
    },
    {
      label: t('pricePolicyTypeGroup'),
      name: 'policyPriceTypeGroupId',
      key: 'policyPriceTypeGroupId',
      type: TYPE_FIELD.SELECT,
      value: formControl.values.policyPriceTypeGroupId,
      options: pricePolicyGroup?.data.map((pricePolicyGroup: TPricePolice) => ({
        value: pricePolicyGroup.id ?? null,
        label: pricePolicyGroup.policyPriceTypeGroupRefName ?? null,
      })),
      onChange: (value: string) => {
        handleChange('policyPriceTypeGroupId', value);
      },
    },
    {
      name: 'visitTypeGroupId',
      key: 'visitTypeGroupId',
      label: t('visitTypeGroup'),
      type: TYPE_FIELD.SELECT,
      options: transformToOptions(
        visitSources?.data || [],
        'id',
        'visitTypeGroupRefName',
      ),
      value: formControl.values.visitTypeGroup,
      onChange: (value: string) => {
        handleChange('visitTypeGroupId', value);
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
              ? t('Add price policy type')
              : modalType === 'edit'
                ? t('Edit price policy type')
                : t('View price policy type')}
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

export default PricePolicyTypeModal;
