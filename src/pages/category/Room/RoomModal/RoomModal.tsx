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
import { CatRoomModalType, TCatRoom } from 'src/constants/types/category/rooms';
import accidentApi from 'src/helpers/api/category/acident';
import { getDataURI } from 'src/utils/image';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CatRoomModalType;
  selectedRecord: TCatRoom | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TCatRoom = {
  id: '',
  roomId: '',
  facilityId: '',
  areaId: '',
  roomTypeId: '',
  roomNo: '',
  roomName: '',
  roomNameEnglish: '',
  roomNameUnUnicode: '',
  roomIsMedicare: '',
  roomIsService: '',
  roomIsArmy: '',
  roomIsActive: '',
  roomIsMinorSurgery: '',
  roomIsActived: '',
  chuyenkhoaId: '',
  inactiveDate: '',
  orderIndex: '',
  tang: '',
  nhom: '',
  payTypeId: '',
  idKhuTiepNhan: '',
  quanityTreatmentTable: '',
  loaiPhongTheoGiaId: '',
};

const RoomModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    roomNo: Yup.string().required(t('Please_enter_this_fields')).nullable(),
    roomName: Yup.string().required(t('Please_enter_this_fields')).nullable(),
    roomNameEnglish: Yup.string()
      .required(t('Please_enter_this_fields'))
      .nullable(),
    roomNameUnUnicode: Yup.string()
      .required(t('Please_enter_this_fields'))
      .nullable(),
    roomIsMedicare: Yup.string()
      .required(t('Please_enter_this_fields'))
      .nullable(),
    roomIsService: Yup.string()
      .required(t('Please_enter_this_fields'))
      .nullable(),
  });

  const formControl = useFormik<TCatRoom>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TCatRoom) => {
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
  const handleChange = (key: keyof TCatRoom, value: any) => {
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
      name: 'roomId',
      key: 'roomId',
      label: t('roomId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomId', e.target.value);
      },
    },
    {
      name: 'facilityId',
      key: 'facilityId',
      label: t('facilityId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.facilityId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('facilityId', e.target.value);
      },
    },
    {
      name: 'areaId',
      key: 'areaId',
      label: t('areaId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.areaId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('areaId', e.target.value);
      },
    },
    {
      name: 'roomTypeId',
      key: 'roomTypeId',
      label: t('roomTypeId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomTypeId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomTypeId', e.target.value);
      },
    },
    {
      name: 'roomNo',
      key: 'roomNo',
      label: t('roomNo'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomNo,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomNo', e.target.value);
      },
    },
    {
      name: 'roomName',
      key: 'roomName',
      label: t('roomName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomName', e.target.value);
      },
    },
    {
      name: 'roomNameEnglish',
      key: 'roomNameEnglish',
      label: t('roomNameEnglish'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomNameEnglish,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomNameEnglish', e.target.value);
      },
    },
    {
      name: 'roomNameUnUnicode',
      key: 'roomNameUnUnicode',
      label: t('roomNameUnUnicode'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomNameUnUnicode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomNameUnUnicode', e.target.value);
      },
    },
    {
      name: 'roomIsMedicare',
      key: 'roomIsMedicare',
      label: t('roomIsMedicare'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.roomIsMedicare,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsMedicare', e.target.value);
      },
    },
    {
      name: 'chuyenkhoaId',
      key: 'chuyenkhoaId',
      label: t('chuyenkhoaId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.chuyenkhoaId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('chuyenkhoaId', e.target.value);
      },
    },
    {
      name: 'inactiveDate',
      key: 'inactiveDate',
      label: t('inactiveDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.inactiveDate,
      onChange: (_, dateString: string) => {
        handleChange('inactiveDate', dateString);
      },
    },
    {
      name: 'orderIndex',
      key: 'orderIndex',
      label: t('orderIndex'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.orderIndex,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('orderIndex', e.target.value);
      },
    },
    {
      name: 'tang',
      key: 'tang',
      label: t('tang'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tang,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tang', e.target.value);
      },
    },
    {
      name: 'nhom',
      key: 'nhom',
      label: t('nhom'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.nhom,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhom', e.target.value);
      },
    },
    {
      name: 'payTypeId',
      key: 'payTypeId',
      label: t('payTypeId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.payTypeId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('payTypeId', e.target.value);
      },
    },
    {
      name: 'idKhuTiepNhan',
      key: 'idKhuTiepNhan',
      label: t('idKhuTiepNhan'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.idKhuTiepNhan,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('idKhuTiepNhan', e.target.value);
      },
    },
    {
      name: 'quanityTreatmentTable',
      key: 'quanityTreatmentTable',
      label: t('quanityTreatmentTable'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.quanityTreatmentTable,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('quanityTreatmentTable', e.target.value);
      },
    },
    {
      name: 'loaiPhongTheoGiaId',
      key: 'loaiPhongTheoGiaId',
      label: t('loaiPhongTheoGiaId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.loaiPhongTheoGiaId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('loaiPhongTheoGiaId', e.target.value);
      },
    },
    {
      name: 'roomIsService',
      key: 'roomIsService',
      label: t('roomIsService'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.roomIsService,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsService', e.target.checked);
      },
    },
    {
      name: 'roomIsArmy',
      key: 'roomIsArmy',
      label: t('roomIsArmy'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.roomIsArmy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsArmy', e.target.checked);
      },
    },
    {
      name: 'roomIsActive',
      key: 'roomIsActive',
      label: t('roomIsActive'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.roomIsActive,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsActive', e.target.checked);
      },
    },
    {
      name: 'roomIsMinorSurgery',
      key: 'roomIsMinorSurgery',
      label: t('roomIsMinorSurgery'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.roomIsMinorSurgery,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsMinorSurgery', e.target.checked);
      },
    },
    {
      name: 'roomIsActived',
      key: 'roomIsActived',
      label: t('roomIsActived'),
      type: TYPE_FIELD.CHECKBOX,
      value: formControl.values.roomIsActived,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('roomIsActived', e.target.checked);
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
              ? t('Add_room')
              : modalType === 'edit'
                ? t('Edit_room')
                : t('View_room')}
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

export default RoomModal;
