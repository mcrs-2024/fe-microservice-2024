import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TContractorCategory,
  TContractorCategoryModal,
  TMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import contractorCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/contractorCategory';
import { useGetAllMedicine } from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddContractorCategory {
  show: boolean;
  modalType: TContractorCategoryModal;
  ContractorCategory: TContractorCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TContractorCategory = {
  id: null,
  thuoc: null,
  soThau: null,
  quyetDinh: null,
  congBo: null,
  ghiChu: null,
};

const ContractorCategoryModal = ({
  show,
  modalType,
  ContractorCategory,
  onHide,
  onSuccess,
}: AddContractorCategory) => {
  //const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const { data: medicines } = useGetAllMedicine();

  const formSchema = yupObject({
    thuoc: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please enter drug name'))
      .nullable(),
    ghiChu: Yup.string().required(t('Please enter note')).nullable(),
    soThau: Yup.string().required(t('Please enter tender number')).nullable(),
    quyetDinh: Yup.string().required(t('Please enter decision')).nullable(),
    congBo: Yup.string().required(t('Please enter announcement')).nullable(),
  });
  const formControl = useFormik<TContractorCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TContractorCategory) => {
      try {
        if (modalType === 'edit') {
          const res = await contractorCategoryApi.updateContractor(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await contractorCategoryApi.createContractor(data);
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
  const handleChange = (key: keyof TContractorCategory, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  const handleResetForm = () => {
    formControl.resetForm();
  };
  useEffect(() => {
    if (modalType === 'edit' && ContractorCategory) {
      handleResetForm();
      formControl.setValues(ContractorCategory);
    }
    if (modalType === 'add' && ContractorCategory) {
      handleResetForm();
    }
  }, [modalType, ContractorCategory]);
  const inputs: InputProps[] = [
    {
      label: t('Medicine'),
      name: 'thuoc',
      key: 'thuoc',
      type: TYPE_FIELD.SELECT,
      options: medicines?.data?.map((medicine: TMedicineCategory) => ({
        value: medicine.id ?? '',
        label: medicine.ten ?? '',
      })),
      value: formControl.values.thuoc,
      onChange: (value: number) => {
        handleChange('thuoc', value);
      },
    },
    {
      label: t('Tender number'),
      name: 'soThau',
      key: 'soThau',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.soThau,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soThau', e.target.value);
      },
    },
    {
      label: t('Decision'),
      name: 'quyetDinh',
      key: 'quyetDinh',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.quyetDinh,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('quyetDinh', e.target.value);
      },
    },
    {
      label: t('Announcement'),
      name: 'congBo',
      key: 'congBo',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.congBo,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('congBo', e.target.value);
      },
    },
    {
      label: t('Note'),
      name: 'ghiChu',
      key: 'ghiChu',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.ghiChu,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('ghiChu', e.target.value);
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
              ? t('Add_Contractor')
              : modalType === 'edit'
                ? t('Edit_Contractor')
                : t('View_Contractor')}
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

export default ContractorCategoryModal;
