import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  MedicalSuppliesGroupModalType,
  TMedicalSuppliesGroup,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSuppliesGroup';
import medicalSuppliesGroupApi, {
  useMedicalSuppliesGroup,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSuppliesGroup';
import useFilter from 'src/hooks/useFilter';

import MedicalSuppliesGroupModal from './MedicalSuppliesGroupModal/MedicalSuppliesGroupModal';

const MedicalSuppliesGroup = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: medicalSuppliesGroup,
    isLoading,
    mutate,
  } = useMedicalSuppliesGroup(pagination);
  const [selectedMedicalSuppliesGroup, setselectedMedicalSuppliesGroup] =
    useState<TMedicalSuppliesGroup | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] =
    useState<MedicalSuppliesGroupModalType>('add');
  const onChangeModalType = (type: MedicalSuppliesGroupModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await medicalSuppliesGroupApi.deleteMedicalSuppliesGroup(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const column: ColumnsType<TMedicalSuppliesGroup> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      width: 300,
    },
    {
      title: t('ghiChu'),
      dataIndex: 'ghiChu',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TMedicalSuppliesGroup) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedMedicalSuppliesGroup(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.View>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDelete(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                type='link'
                size='small'
                icon={<DeleteOutlined />}
                style={{ color: token['red-7'] }}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <TableCustom
          extra={
            <>
              <ButtonCustom.Create
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  onChangeModalType('add');
                  onOpenModal();
                }}
              >
                {t('Add')}
              </ButtonCustom.Create>
            </>
          }
          title={t('MedicalSuppliesGroup')}
          columns={column}
          data={medicalSuppliesGroup?.data?.content || []}
          pagination={{
            pageNum: medicalSuppliesGroup?.data?.pageNum,
            pageSize: medicalSuppliesGroup?.data?.pageSize,
            totalElements: medicalSuppliesGroup?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <MedicalSuppliesGroupModal
        key={selectedMedicalSuppliesGroup?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedMedicalSuppliesGroup}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></MedicalSuppliesGroupModal>
    </>
  );
};

export default MedicalSuppliesGroup;
