import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  TMedicineGroupCategory,
  TMedicineGroupCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import medicineGroupCategoryApi, {
  useMedicineGroupCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineGroupCategory';
import useFilter from 'src/hooks/useFilter';

import MedicineGroupCategoryModal from './MedicineGroupCategoryModal';

const MedicineGroupCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();

  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: medicineGroups,
    isLoading,
    mutate,
  } = useMedicineGroupCategory(pagination);
  const [setGroupOfMedicine, setSelectedGroupOfMedicine] =
    useState<TMedicineGroupCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] =
    useState<TMedicineGroupCategoryModal>('add');
  const onChangeModalType = (type: TMedicineGroupCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: number | null) => {
    try {
      const res = await medicineGroupCategoryApi.deleteMedicineGroup(id);
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

  const column: ColumnsType<TMedicineGroupCategory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: t('Type_of_Medicine_ID'),
      dataIndex: 'maLoaiThuoc',
      width: 200,
      align: 'center',
    },
    {
      title: t('Name of group of medicine'),
      dataIndex: 'tenNhomThuoc',
      width: 150,
    },
    {
      title: t('description'),
      dataIndex: 'moTa',
      width: 150,
    },
    {
      title: t('Created by'),
      dataIndex: 'createdBy',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TMedicineGroupCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedGroupOfMedicine(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.Edit>
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
                {t('Add new group of medicine')}
              </ButtonCustom.Create>
            </>
          }
          title={t('List of group of medicine')}
          columns={column}
          data={medicineGroups?.data?.content || []}
          pagination={{
            pageSize: medicineGroups?.data?.pageSize,
            pageNum: medicineGroups?.data?.pageNum,
            totalElements: medicineGroups?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={false}
          isRowSelection={false}
          showVisibleColumns={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <MedicineGroupCategoryModal
        key={setGroupOfMedicine?.id}
        modalType={modalType}
        show={isOpenModal}
        data={setGroupOfMedicine}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></MedicineGroupCategoryModal>
    </>
  );
};

export default MedicineGroupCategory;
