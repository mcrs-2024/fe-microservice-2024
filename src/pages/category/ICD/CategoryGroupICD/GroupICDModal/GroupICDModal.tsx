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
  BlockICDModalType,
  TBlockICD,
} from 'src/constants/types/category/blockICD';
import { TChapter } from 'src/constants/types/category/chapter';
import BlockICDApi, {
  useGetAllBlockIDC,
} from 'src/helpers/api/category/blockICD';
import { useGetAllChapter } from 'src/helpers/api/category/chapterApi';
import groupICDApi from 'src/helpers/api/categoryGroupICD/categoryGroupICD';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddGroupICDProps {
  show: boolean;
  modalType: BlockICDModalType;
  category: TBlockICD | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      id: string;
      icdBlocksCode: string | null;
      icdBlocksName: string | null;
      icdChapterId: string | null;
      seqNum: number | null;
    }
  | TBlockICD;

const defaultValue: FormValues = {
  id: '',
  icdBlocksCode: '',
  icdBlocksName: '',
  icdChapterId: '',
  seqNum: null,
};

const GroupICDModal = ({
  show,
  modalType,
  onHide,
  category,
  onSuccess,
}: AddGroupICDProps) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'edit';
  const { data: chapters } = useGetAllChapter();

  const formSchema = yupObject({
    icdBlocksCode: Yup.string().required().nullable(),
    icdBlocksName: Yup.string().required().nullable(),
  });

  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      try {
        if (modalType === 'add') {
          const res = await BlockICDApi.createBlockICD(data);
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
          const res = await BlockICDApi.updateBlockICD(data);
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
  const handleChange = (key: keyof FormValues, value: any) => {
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
      name: 'icdBlocksCode',
      key: 'icdBlocksCode',
      label: t('Block Code'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.icdBlocksCode,
      disabled: isDisable,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdBlocksCode', e.target.value);
      },
    },
    {
      name: 'icdBlocksName',
      key: 'icdBlocksName',
      label: t('Group Name'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.icdBlocksName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdBlocksName', e.target.value);
      },
    },
    {
      name: 'icdChapterId',
      key: 'icdChapterId',
      label: t('Code Category'),
      type: TYPE_FIELD.SELECT,
      options: chapters?.data?.map((chapter: TChapter) => ({
        value: chapter.id ?? null,
        label: chapter.icdChapterNameV ?? null,
      })),
      value: formControl.values.icdChapterId,
      onChange: (value: string) => {
        handleChange('icdChapterId', value);
      },
    },
  ];

  useEffect(() => {
    if (modalType === 'edit' && category) {
      handleResetForm();
      formControl.setValues(category);
    }
    if (modalType === 'add' && category) {
      handleResetForm();
    }
  }, [modalType, category]);

  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add category group ICD')
              : modalType === 'edit'
                ? t('Edit category group ICD')
                : t('View category group ICD')}
          </Typography.Title>
        }
        footer
        width={500}
      >
        <Space direction='vertical'>
          <InputFields inputs={inputs} form={formControl} gutter={[0, 6]} />

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

export default GroupICDModal;
