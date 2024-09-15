// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { UserModalType } from 'src/constants/types';
import { TRole } from 'src/constants/types/admin/role';
import { rolesApi } from 'src/helpers/api/admin/role';
import { textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMemberProps {
  show: boolean;
  modalType: UserModalType;
  role: TRole | null;
  onHide: () => void;
  onSuccess: () => void;
}

interface FormValues {
  id?: string;
  roleCode: string;
  roleName: string;
  description: string | null;
  status: number | null;
}
const schemaResolver = yupObject({
  roleName: Yup.string()
    .required('Please enter name')
    .min(6, 'Too short')
    .max(50, 'Too long')
    .nullable(),
  roleCode: textOnly
    .required('Please enter role code')
    .max(10, 'Too long')
    .nullable(),
  status: Yup.number().nullable(),
});
const defaultValue: FormValues = {
  roleCode: '',
  roleName: '',
  description: null,
  status: 1,
};

const RoleModal = ({
  show,
  modalType,
  onHide,
  role,
  onSuccess,
}: AddMemberProps) => {
  const isDisable = modalType === 'view';
  const { t } = useTranslation();
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: schemaResolver,
    onSubmit: async (data: FormValues) => {
      try {
        let res = null;
        if (modalType === 'add') {
          res = await rolesApi.addRole({
            ...data,
            status: data.status === 1,
          });
        } else {
          res = await rolesApi.updateRole({
            ...data,
            status: data.status === 1,
          });
        }

        if (res.data.code === 200) {
          message.success(res.data.message);
          handleResetForm();
          onSuccess();
          onHide();
          onHide();
          onHide();
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        message.error(error);
      }
    },
  });
  const handleChange = (
    key: keyof FormValues,
    value: string | number | boolean | null | number[] | string[],
  ) => {
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
      name: 'roleCode',
      label: t('Role_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      require: true,
      value: formControl.values.roleCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roleCode', e.target.value.toUpperCase().trim());
      },
    },
    {
      name: 'roleName',
      label: t('Role_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      require: true,
      value: formControl.values.roleName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roleName', e.target.value);
      },
    },
    {
      name: 'description',
      label: t('Description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.description,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
      },
    },
    {
      name: 'status',
      label: t('status'),
      type: TYPE_FIELD.RADIO,
      options: [
        {
          value: 1,
          label: 'Active',
        },
        {
          value: 0,
          label: 'UnActive',
        },
      ],
      disabled: isDisable,
      value: formControl.values.status,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('status', Number(e.target.value) || 0);
      },
    },
  ];

  useEffect(() => {
    if ((modalType === 'edit' || modalType === 'view') && role) {
      handleResetForm();
      formControl.setValues({
        id: role.id,
        roleName: role.roleName || '',
        roleCode: role.roleCode || '',
        description: role.description,
        status: role.status ? 1 : 0,
      });
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, role]);

  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        footer={null}
        title={
          <Typography.Title level={4}>
            {modalType === 'add'
              ? t('Add_new_role')
              : modalType === 'edit'
                ? t('Edit_role')
                : t('View_role')}
          </Typography.Title>
        }
      >
        <InputFields inputs={inputs} form={formControl} />
        <Flex justify='end' gap={12}>
          <Button onClick={onHide}>{t('cancel')}</Button>
          <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
            {t('Save')}
          </ButtonCustom.Edit>
        </Flex>
      </Modal>
    </>
  );
};

export default RoleModal;
