// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { DebtModalType, TDebt } from 'src/constants/types/category/Debt';
import { TOrganization } from 'src/constants/types/category/organization';
import debtApi from 'src/helpers/api/category/debt';
import { useGetAllOrganization } from 'src/helpers/api/category/organization';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: DebtModalType;
  selectedRecord: TDebt | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TDebt = {
  id: null,
  policyThirdPartyId: null,
  organisationId: null,
  contactName: null,
  contactTel: null,
  contactFax: null,
  contactEmail: null,
  contractRenewalDate: null,
  contractStartDate: null,
  contractEndDate: null,
  contractDrawnUpBy: null,
  contractSignedBy: null,
  contractSignDate: null,
  comment: null,
  accountingCustomerId: null,
  policyTypeRcd: null,
  facilityId: null,
};

const DebtModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: organizations } = useGetAllOrganization();

  const formSchema = yupObject({
    organisationId: Yup.string().required().nullable(),
    contactName: Yup.string().required().nullable(),
    contactTel: Yup.string().required().nullable(),
    contactFax: Yup.string().required().nullable(),
    contactEmail: Yup.string().required().nullable(),
    contractRenewalDate: Yup.string().required().nullable(),
    contractStartDate: Yup.string().required().nullable(),
    contractEndDate: Yup.string().required().nullable(),
    contractDrawnUpBy: Yup.string().required().nullable(),
    contractSignedBy: Yup.string().required().nullable(),
    contractSignDate: Yup.string().required().nullable(),
    comment: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TDebt>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TDebt) => {
      try {
        if (modalType === 'add') {
          const res = await debtApi.createDebt(data);
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
          const res = await debtApi.updateDebt(data);
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
  const handleChange = (key: keyof TDebt, value: any) => {
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
      name: 'organisationId',
      key: 'organisationId',
      label: t('Organisation'),
      type: TYPE_FIELD.SELECT,
      options: organizations?.data?.map((organization: TOrganization) => ({
        value: organization.id ?? null,
        label: organization.organisationName ?? null,
      })),
      value: formControl.values.organisationId,
      onChange: (value: string) => {
        handleChange('organisationId', value);
      },
    },
    {
      name: 'contactName',
      key: 'contactName',
      label: t('Contract_name'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contactName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contactName', e.target.value);
      },
    },
    {
      name: 'contactTel',
      key: 'contactTel',
      label: t('contactTel'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contactTel,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contactTel', e.target.value);
      },
    },
    {
      name: 'contactFax',
      key: 'contactFax',
      label: t('contactFax'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contactFax,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contactFax', e.target.value);
      },
    },
    {
      name: 'contactEmail',
      key: 'contactEmail',
      label: t('contactEmail'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contactEmail,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contactEmail', e.target.value);
      },
    },
    {
      name: 'contractRenewalDate',
      key: 'contractRenewalDate',
      label: t('contractRenewalDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.contractRenewalDate,
      onChange: (_, dateString: string) => {
        handleChange('contractRenewalDate', dateString);
      },
    },
    {
      name: 'contractStartDate',
      key: 'contractStartDate',
      label: t('contractStartDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.contractStartDate,
      onChange: (_, dateString: string) => {
        handleChange('contractStartDate', dateString);
      },
    },
    {
      name: 'contractEndDate',
      key: 'contractEndDate',
      label: t('contractEndDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.contractEndDate,
      onChange: (_, dateString: string) => {
        handleChange('contractEndDate', dateString);
      },
    },
    {
      name: 'contractDrawnUpBy',
      key: 'contractDrawnUpBy',
      label: t('contractDrawnUpBy'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contractDrawnUpBy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contractDrawnUpBy', e.target.value);
      },
    },
    {
      name: 'contractSignedBy',
      key: 'contractSignedBy',
      label: t('contractSignedBy'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.contractSignedBy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('contractSignedBy', e.target.value);
      },
    },
    {
      name: 'contractSignDate',
      key: 'contractSignDate',
      label: t('contractSignDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.contractSignDate,
      onChange: (_, dateString: string) => {
        handleChange('contractSignDate', dateString);
      },
    },
    {
      name: 'comment',
      key: 'comment',
      label: t('comment'),
      type: TYPE_FIELD.TEXT,
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
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_liability_object')
              : modalType === 'edit'
                ? t('Edit_liability_object')
                : t('view_liability_object')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 8 }}
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

export default DebtModal;
