import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  TMedicineCategory,
  TMedicineCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import medicineCategoryApi, {
  useMedicineCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineCategory';
import useFilter from 'src/hooks/useFilter';

import MedicineCategoryModal from './MedicineCategoryModal';

const MedicineCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: medicineCategory,
    isLoading,
    mutate,
  } = useMedicineCategory(pagination);
  const [selectedMedicineCategory, setSelectedMedicineCategory] =
    useState<TMedicineCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<TMedicineCategoryModal>('add');
  const onChangeModalType = (type: TMedicineCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: number | null) => {
    try {
      const res = await medicineCategoryApi.deleteMedicine(id);
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

  const column: ColumnsType<TMedicineCategory> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('Medicine code according to health insurance'),
      dataIndex: 'maBhyt',
      width: 300,
    },
    {
      title: t('Medicine group code according to health insurance'),
      dataIndex: 'maLoaiBhyt',
      width: 350,
    },
    {
      title: t('Route of drug'),
      dataIndex: 'duongDung',
      width: 150,
    },
    {
      title: t('Medicine_name'),
      dataIndex: 'ten',
      width: 150,
    },
    {
      title: t('Registration_Number'),
      dataIndex: 'soDangKy',
      width: 150,
    },
    {
      title: t('Insurance payment'),
      dataIndex: 'bhChiTra',
      width: 150,
    },
    {
      title: t('Active_Ingredient'),
      dataIndex: 'hoatChat',
      width: 150,
    },
    {
      title: t('Active_Ingredient_ID'),
      dataIndex: 'hoatChatId',
      width: 150,
    },
    {
      title: t('Concentration/Content'),
      dataIndex: 'hamLuong',
      width: 200,
    },
    {
      title: t('Type_of_Medicine'),
      dataIndex: 'loaiThuoc',
      width: 150,
    },
    {
      title: 'Stend',
      dataIndex: 'isStend',
      width: 150,
      render: (value: boolean) => {
        return value ? 'Có' : 'Không';
      },
    },
    {
      title: t('Main unit'),
      dataIndex: 'donViChinh',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TMedicineCategory) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedMedicineCategory(record);
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
                {t('Add new medicine')}
              </ButtonCustom.Create>
            </>
          }
          title={t('Medicine list')}
          columns={column}
          //data={sampleData}
          data={medicineCategory?.data?.content || []}
          pagination={{
            pageNum: medicineCategory?.data?.pageNum,
            pageSize: medicineCategory?.data?.pageSize,
            totalElements: medicineCategory?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <MedicineCategoryModal
        key={selectedMedicineCategory?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedMedicineCategory}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></MedicineCategoryModal>
    </>
  );
};

export default MedicineCategory;
