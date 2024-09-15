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
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  CatUsersModalType,
  TCatUsers,
} from 'src/constants/types/category/user';
import accidentApi from 'src/helpers/api/category/acident';
import { getDataURI } from 'src/utils/image';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CatUsersModalType;
  selectedRecord: TCatUsers | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TCatUsers = {
  id: '',
  areaId: '',
  facilityID: '',
  areaNo: '',
  areaCode: '',
  areaName: '',
  areaNameUnUnicode: '',
  areaNameEnglish: '',
  areaTypeId: '',
  areaIsSurgery: '',
  areaIsActive: '',
  orderIndex: '',
};

const UsersModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    facilityID: Yup.string().required(t('Please_enter_this_field')).nullable(),
    username: Yup.string().required(t('Please_enter_this_field')).nullable(),
    passwordHash: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    empID: Yup.string().required(t('Please_enter_this_field')).nullable(),
  });

  const formControl = useFormik<TCatUsers>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TCatUsers) => {
      try {
        if (modalType === 'add') {
          const res = await accidentApi.createAcident(data);
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
          const res = await accidentApi.updateAcident(data);
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
  const handleChange = (key: keyof TCatUsers, value: any) => {
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
      name: 'facilityID',
      key: 'facilityID',
      label: t('facilityID'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.facilityID,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('facilityID', e.target.value);
      },
    },
    {
      name: 'username',
      key: 'username',
      label: t('username'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.username,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('username', e.target.value);
      },
    },
    {
      name: 'passwordHash',
      key: 'passwordHash',
      label: t('passwordHash'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.passwordHash,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('passwordHash', e.target.value);
      },
    },
    {
      name: 'empID',
      key: 'empID',
      label: t('empID'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.empID,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('empID', e.target.value);
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
    {
      name: 'isUsingESignature',
      key: 'isUsingESignature',
      label: t('isUsingESignature'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.isUsingESignature,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isUsingESignature', e.target.checked);
      },
    },
    {
      name: 'active',
      key: 'active',
      label: t('active'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.active,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('active', e.target.checked);
      },
    },
    {
      name: 'locked',
      key: 'locked',
      label: t('locked'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.locked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('locked', e.target.checked);
      },
    },
    {
      name: 'eSignatureImage',
      label: t('eSignatureImage'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.eSignatureImage,
      fileSize: 4,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
        handleChange('eSignatureImage', dataURI);
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
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_users')
              : modalType === 'edit'
                ? t('Edit_users')
                : t('View_users')}
          </Typography.Title>
        }
        footer
        width={1200}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 48, lg: 6 }}
            gutter={[0, 8]}
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

export default UsersModal;
