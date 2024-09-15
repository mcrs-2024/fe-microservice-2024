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
  ChapterModalType,
  TChapter,
} from 'src/constants/types/category/chapter';
import { TICDType } from 'src/constants/types/category/icdType';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { useGetAllICDType } from 'src/helpers/api/category/ICDType';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: ChapterModalType;
  selectedRecord: TChapter | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TChapter = {
  id: '',
  icdChapterCode: '',
  icdChapterName: '',
  icdTypeId: '',
  seqNum: null,
};

const ChapterModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: icdtypes } = useGetAllICDType();

  const formSchema = yupObject({
    icdTypeId: Yup.string().required().nullable(),
    icdChapterCode: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TChapter>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TChapter) => {
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
      name: 'icdTypeId',
      label: t('icdTypeCode'),
      type: TYPE_FIELD.SELECT,
      options: icdtypes?.data?.map((icdtype: TICDType) => ({
        value: icdtype.id ?? null,
        label: icdtype.icdTypeName ?? null,
      })),
      disabled: isDisable,
      value: formControl.values.icdTypeId,
      onChange: (value: string) => {
        handleChange('icdTypeId', value);
      },
    },
    {
      name: 'icdChapterCode',
      key: 'icdChapterCode',
      label: t('Chapter_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.icdChapterCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('icdChapterCode', e.target.value);
      },
    },
    {
      name: 'icdChapterName',
      key: 'icdChapterName',
      label: t('Chapter_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: {
        vn: formControl.values.icdChapterNameV,
        en: formControl.values.icdChapterNameE,
      },
      onChange: (e: { target: { value: { vn: string; en: string } } }) => {
        formControl.setValues({
          ...formControl.values,
          icdChapterNameV: e.target.value.vn,
          icdChapterNameE: e.target.value.en,
        });
      },
      showLanguageToggle: true,
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
              ? t('Add_chapter_category')
              : modalType === 'edit'
                ? t('Edit_chapter_category')
                : t('View_chapter_category')}
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

export default ChapterModal;
