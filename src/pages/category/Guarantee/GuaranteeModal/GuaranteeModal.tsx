// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  GuaranteeModalType,
  TGuarantee,
  TPatient,
  TPersonIndicatorSub,
  TVisitType,
} from 'src/constants/types/category/guarantees';
import { TIndicatorType } from 'src/constants/types/category/indicatorType';
import guaranteeApi, {
  useGetAllPatient,
  useGetAllPersonIndicatorSub,
  useGetAllVisitType,
} from 'src/helpers/api/category/guarantee';
import { useGetAllIndicatorType } from 'src/helpers/api/category/indicatorTypeApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: GuaranteeModalType;
  selectedRecord: TGuarantee | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TGuarantee = {
  id: null,
  personIndicator: null,
  personIndicatorSub: null,
  visitType: null,
  patientPricingClass: null,
  effectiveFromDate: null,
  effectiveToDate: null,
  seqNum: null,
};

const GuaranteeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: personIndicators } = useGetAllIndicatorType();
  const { data: personIndicatorSub } = useGetAllPersonIndicatorSub();
  const { data: patients } = useGetAllPatient();
  const { data: vistiType } = useGetAllVisitType();

  const formSchema = yupObject({
    personIndicator: Yup.string().required().nullable(),
    personIndicatorSub: Yup.string().required().nullable(),
    visitType: Yup.string().required().nullable(),
    patientPricingClass: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TGuarantee>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TGuarantee) => {
      try {
        if (modalType === 'add') {
          const res = await guaranteeApi.createGuarantee(data);
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
          const res = await guaranteeApi.updateGuarantee(data);
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
  const handleChange = (key: keyof TGuarantee, value: any) => {
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
      name: 'personIndicator',
      key: 'personIndicator',
      label: t('personIndicatorRecord'),
      type: TYPE_FIELD.SELECT,
      options: personIndicators?.data?.map((pic: TIndicatorType) => ({
        value: pic.id ?? null,
        label: pic.personIndicatorName ?? null,
      })),
      value: formControl.values.personIndicator,
      onChange: (value: string | null) => {
        handleChange('personIndicator', value);
      },
    },
    {
      name: 'personIndicatorSub',
      key: 'personIndicatorSub',
      label: t('cardClass'),
      type: TYPE_FIELD.SELECT,
      options: personIndicatorSub?.data?.map((pic: TPersonIndicatorSub) => ({
        value: pic.id ?? null,
        label: pic.personIndicatorSubName ?? null,
      })),
      value: formControl.values.personIndicatorSub,
      onChange: (value: string | null) => {
        handleChange('personIndicatorSub', value);
      },
    },
    {
      name: 'visitType',
      key: 'visitType',
      label: t('visitType'),
      type: TYPE_FIELD.SELECT,
      options: vistiType?.data?.map((pic: TVisitType) => ({
        value: pic.id ?? null,
        label: pic.visitTypeRefName ?? null,
      })),
      value: formControl.values.visitType,
      onChange: (value: string | null) => {
        handleChange('visitType', value);
      },
    },
    {
      name: 'patientPricingClass',
      key: 'patientPricingClass',
      label: t('patientPricingClass'),
      type: TYPE_FIELD.SELECT,
      options: patients?.data?.map((pic: TPatient) => ({
        value: pic.id ?? null,
        label: pic.patientPricingClassRefName ?? null,
      })),
      value: formControl.values.patientPricingClass,
      onChange: (value: string | null) => {
        handleChange('patientPricingClass', value);
      },
    },
    {
      name: 'effectiveFromDate',
      key: 'effectiveFromDate',
      label: t('actionDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.effectiveFromDate,
      onChange: (_, dateString: string) => {
        handleChange('effectiveFromDate', dateString);
      },
    },
    {
      name: 'effectiveToDate',
      key: 'effectiveToDate',
      label: t('effectiveDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.effectiveToDate,
      onChange: (_, dateString: string) => {
        handleChange('effectiveToDate', dateString);
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
              ? t('Add_guarantee_category')
              : modalType === 'edit'
                ? t('Edit_guarantee_category')
                : t('View_guarantee_category')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical' className='w-100'>
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

export default GuaranteeModal;
