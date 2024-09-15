import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  TMedicineTypeCategory,
  TMedicineTypeCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import medicineTypeCategoryApi, {
  useMedicineTypeCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineTypeCategory';
import useFilter from 'src/hooks/useFilter';

import MedicineTypeCategoryModal from './MedicineTypeCategoryModal';

const MedicineTypeCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: MedicineTypeCategory,
    isLoading,
    mutate,
  } = useMedicineTypeCategory(pagination);
  const [setTypeOfMedicine, setSelectedTypeOfMedicine] =
    useState<TMedicineTypeCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<TMedicineTypeCategoryModal>('add');
  const onChangeModalType = (type: TMedicineTypeCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: number | null) => {
    try {
      const res = await medicineTypeCategoryApi.deleteMedicineType(id);
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

  const column: ColumnsType<TMedicineTypeCategory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: t('Type_of_Medicine_ID'),
      dataIndex: 'maLoaiThuoc',
      width: 100,
      align: 'center',
    },
    {
      title: t('Name type of medicine'),
      dataIndex: 'tenLoaiThuoc',
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
      render: (_, record: TMedicineTypeCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedTypeOfMedicine(record);
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
                {t('Add new type of medicine')}
              </ButtonCustom.Create>
            </>
          }
          title={t('List of type of medicine')}
          columns={column}
          //data={DANH_SACH_LOAI_THUOC}
          data={MedicineTypeCategory?.data?.content || []}
          pagination={{
            pageSize: MedicineTypeCategory?.data?.pageSize,
            pageNum: MedicineTypeCategory?.data?.pageNum,
            totalElements: MedicineTypeCategory?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={false}
          isRowSelection={false}
          showVisibleColumns={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <MedicineTypeCategoryModal
        key={setTypeOfMedicine?.id}
        modalType={modalType}
        show={isOpenModal}
        MedicineTypeCategory={setTypeOfMedicine}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></MedicineTypeCategoryModal>
    </>
  );
};

export default MedicineTypeCategory;
