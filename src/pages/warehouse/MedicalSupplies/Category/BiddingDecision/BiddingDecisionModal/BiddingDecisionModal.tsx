import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  BiddingDecisionModalType,
  TBiddingDecision,
} from 'src/constants/types/categoryWarehouseSupplier/biddingDecision';
import biddingDecisionApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/biddingDecision';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddBiddingDecision {
  show: boolean;
  modalType: BiddingDecisionModalType;
  data: TBiddingDecision | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TBiddingDecision = {
  id: null,
  note: null,
  soThau: null,
  tenVatTu: null,
  tenDonVi: null,
  ngayCongBo: null,
  quyetDinh: null,
};

const BiddingDecisionModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddBiddingDecision) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    soThau: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_tender_number'))
      .nullable(),
    tenVatTu: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_material_name'))
      .nullable(),
    tenDonVi: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_unit_name'))
      .nullable(),
    quyetDinh: Yup.string()
      .min(5, t('Too_short'))
      .max(255, t('Too_long'))
      .required(t('Please_enter_the_decision'))
      .nullable(),
  });

  const formControl = useFormik<TBiddingDecision>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TBiddingDecision) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await biddingDecisionApi.updateBiddingDecision(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await biddingDecisionApi.createBiddingDecision(data);
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

  const handleResetForm = () => {
    formControl.resetForm();
  };

  const handleChange = (key: keyof TBiddingDecision, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (modalType === 'edit' && data) {
      formControl.setValues(data);
    }
    if (modalType === 'add' && data) {
      handleResetForm();
    }
  }, [modalType, data]);
  const input: InputProps[] = [
    {
      label: t('tenDonVi'),
      name: 'tenDonVi',
      key: 'tenDonVi',
      allowClear: true,
      require: true,
      value: formControl.values.tenDonVi,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenDonVi', e.target.value);
      },
    },
    {
      label: t('tenVatTu'),
      name: 'tenVatTu',
      key: 'tenVatTu',
      allowClear: true,
      require: true,
      value: formControl.values.tenVatTu,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenVatTu', e.target.value);
      },
    },
    {
      label: t('soThau'),
      name: 'soThau',
      key: 'soThau',
      allowClear: true,
      require: true,
      value: formControl.values.soThau,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soThau', e.target.value);
      },
    },
    {
      label: t('quyetDinh'),
      name: 'quyetDinh',
      key: 'quyetDinh',
      allowClear: true,
      require: true,
      value: formControl.values.quyetDinh,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('quyetDinh', e.target.value);
      },
    },
    {
      label: t('ngayCongBo'),
      name: 'ngayCongBo',
      key: 'ngayCongBo',
      allowClear: true,
      value: formControl.values.ngayCongBo,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('ngayCongBo', dateString);
      },
    },
    {
      label: t('note'),
      name: 'note',
      key: 'note',
      allowClear: true,
      value: formControl.values.note,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('note', e.target.value);
      },
    },
  ];
  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('AddBiddingDecision')
              : modalType === 'edit'
                ? t('EditBiddingDecision')
                : t('ViewBiddingDecision')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical' className='d-flex'>
          <InputFields
            inputs={input}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
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
export default BiddingDecisionModal;
